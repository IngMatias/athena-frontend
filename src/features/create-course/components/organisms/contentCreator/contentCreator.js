import React, { useContext } from "react";
import ContentComponent from "../contentComponent/contentComponent";
import FollowMouseBox from "../followMouseBox/followMouseBox";
import IconTooltip from "../../molecules/iconTooltip/iconTooltip";

import styles from "./contentCreator.module.css";
import { CourseContext } from "@/features/create-course/stores/CourseContextProvider";
import { ModalContext } from "@/stores/ModalContextProvider";
import AddVideoModal from "../addVideoModal/addVideoModal";
import { SelectionContext } from "@/features/create-course/stores/SelectionContextProvider";

export default function ContentCreator() {
  const {
    path,
    content,
    addKeypoints,
    elaborateMoreAt,
    setContentAt,
    addEmptyTextAt,
    addYouTubeVideoAt,
    addExerciseAt,
    addMindMapAt,
    deleteContentAt,
  } = useContext(CourseContext);

  const { selection, selectionElement } = useContext(SelectionContext);

  const { open } = useContext(ModalContext);

  const handleGenerateKeyPoints = () => {
    addKeypoints(path);
  };

  const handleElaborateMore = ({ index }) => {
    elaborateMoreAt(index);
  };

  const handleAddEmptyText = ({ index }) => {
    addEmptyTextAt(index);
  };

  const handleAddYouTubeVideo = ({ index }) => {
    open(AddVideoModal, {
      title: "Agregar video de YouTube",
      handleResult: addYouTubeVideoAt,
    });
  };

  const handleOnChange = ({ index, content }) => {
    setContentAt(index, content);
  };

  const handleOnDelete = ({ index }) => {
    deleteContentAt(index);
  };

  const handleAddTrueFalseWithSelected = (e) => {
    addExerciseAt(
      selectionElement?.dataset?.index
        ? selectionElement.dataset.index
        : content.length,
      {
        numberOfExercises: 3,
        type: "TRUE_FALSE",
        difficulty: "MEDIUM",
        text: selection,
        language: "en_US",
      }
    );
    if (!selectionElement?.dataset?.index) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleAddMultipleChoiceWithSelected = (e) => {
    addExerciseAt(
      selectionElement?.dataset?.index
        ? selectionElement.dataset.index
        : content.length,
      {
        numberOfExercises: 3,
        type: "MULTIPLE_CHOICE",
        difficulty: "MEDIUM",
        text: selection,
        numberOfOptions: 5,
        language: "en_US",
      }
    );
    if (!selectionElement?.dataset?.index) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleAddTrueFalse = ({ index }) => {
    addExerciseAt(index, {
      numberOfExercises: 3,
      type: "TRUE_FALSE",
      difficulty: "MEDIUM",
      text: content[index].text,
      language: "en_US",
    });
  };

  const handleAddMultipleChoice = ({ index }) => {
    addExerciseAt(index, {
      numberOfExercises: 3,
      type: "MULTIPLE_CHOICE",
      difficulty: "MEDIUM",
      text: content[index].text,
      numberOfOptions: 5,
      language: "en_US",
    });
  };

  const handleAddMindMap = ({ index }) => {
    addMindMapAt(index, { text: content[index].text });
  };

  return (
    <div className={styles.contentCreator}>
      <div className={styles.rootActions}>
        <IconTooltip
          onClick={() => handleAddEmptyText({ index: -1 })}
          icon="text_snippet"
        >
          Add Empty Text
        </IconTooltip>
        <IconTooltip onClick={() => handleGenerateKeyPoints()} icon="key">
          Generate <i>keypoints</i> based on title
        </IconTooltip>
        <IconTooltip
          onClick={() => handleAddYouTubeVideo({ index: -1 })}
          icon="key"
        >
          Add <i>YouTube</i> video
        </IconTooltip>
      </div>

      <div>
        {content.map((c, index) => {
          return (
            <div key={c.id}>
              <ContentComponent
                index={index}
                content={c}
                onChange={handleOnChange}
                onDelete={handleOnDelete}
                onElaborateMore={handleElaborateMore}
                onAddEmptyText={handleAddEmptyText}
                onAddTrueFalse={handleAddTrueFalse}
                onAddYouTubeVideo={handleAddYouTubeVideo}
                onAddMultipleChoice={handleAddMultipleChoice}
                onAddMindMap={handleAddMindMap}
              />
            </div>
          );
        })}
      </div>

      <FollowMouseBox>
        <IconTooltip
          onClick={handleAddMultipleChoiceWithSelected}
          icon="radio_button_checked"
        >
          Generate Multiple Choice based on selected text.
        </IconTooltip>

        <IconTooltip onClick={handleAddTrueFalseWithSelected} icon="rule">
          Generate True False based on selected text.
        </IconTooltip>
      </FollowMouseBox>
    </div>
  );
}
