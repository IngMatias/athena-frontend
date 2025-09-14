import {
  deleteIAChatDocument,
  getIAChatDocument,
  postChatSelectedDocument,
  postIAChatDocument,
} from "@/services/ai.chat.service";
import React, { useEffect, useState } from "react";

import styles from "./documentHandler.module.css";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import { useParams } from "next/navigation";

const LoadingStates = {
  SPLITTING_FILES: "SPLITTING FILES",
  LOADING_FILES: "LOADING FILES",
  FINISHED: "FINISHED",
};

export default function DocumentHandler({ setFiles: setParentFiles }) {
  const params = useParams();
  const { courseId } = params;

  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getIAChatDocument({ courseId }).then(({ files }) => {
      setFiles(files);
    });
  }, []);

  const handleSelectFile = (e, { id }) => {
    const selected = e.target.checked;
    postChatSelectedDocument({
      courseId,
      fileId: id,
      selected,
    }).then(({ fileId }) => {
      setParentFiles((oldFiles) => {
        let newFiles = JSON.parse(JSON.stringify(oldFiles));
        for (let f of newFiles) {
          if (f.id === fileId) {
            f.selected = selected;
          }
        }
        return newFiles;
      });
    });
  };

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = async () => {
    postIAChatDocument({
      courseId,
      file,
      onChunk: ({ process, progress, fileId, fileName }) => {
        setFiles((oldFiles) => {
          let found = false;

          const newFiles = oldFiles.map((file) => {
            if (file.fileId === fileId) {
              found = true;
              return { process, progress, fileId, fileName, selected: true };
            }
            return file;
          });

          if (!found) {
            newFiles.push({
              process,
              progress,
              fileId,
              fileName,
              selected: true,
            });
          }

          return newFiles;
        });
      },
    });
  };

  const handleDelete = ({ id }) => {
    deleteIAChatDocument({ fileId: id }).then(({ fileId }) => {
      setFiles((oldFiles) => {
        const newFiles = JSON.parse(JSON.stringify(oldFiles));
        return newFiles.filter((f) => f.id != fileId);
      });
    });
  };

  return (
    <div className={styles.documentHandler}>
      <div className={styles.files}>
        {files.map((f, i) => (
          <div
            key={i}
            className={`${styles.file} ${styles.progressBar}`}
            style={{
              "--progress": `${f.progress}%`,
            }}
          >
            <div className={styles.left}>
              <input
                type="checkbox"
                onChange={(e) => handleSelectFile(e, f)}
                defaultChecked={f.selected}
              />
              <div className={styles.fileName}>{f.fileName}</div>
            </div>

            <div className={styles.right}>
              {f.progress && (
                <div className={styles.loadingState}>
                  <div className={styles.process}>
                    {LoadingStates[f.process]}
                  </div>
                  <div className={styles.progressNumber}>{f.progress}%</div>
                </div>
              )}

              <div className={styles.actions}>
                <button
                  className={styles.action}
                  onClick={() => {
                    handleDelete(f);
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.upload}>
        <input
          className={styles.inputFile}
          type="file"
          onChange={handleUpload}
        />
        <ButtonPrimary label="Load File" onClick={handleSend} />
      </div>
    </div>
  );
}
