import React, { useContext, useEffect, useRef, useState } from "react";
import {
  getAICourseSectionId,
  postIACourseSections,
} from "@/services/ai.course.service";
import TreeSections from "../treeSections/treeSections";
import { useSections } from "@/features/create-course/hooks/useSections";

import styles from "./addVideoModal.module.css";
import ButtonLink from "@/components/atoms/buttonLink/buttonLink";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import InputText from "@/features/question/components/atoms/inputText/inputText";
import { ModalContext } from "@/stores/ModalContextProvider";
import { updateStructureWithIdsByIndex } from "@/utils/id";

export default function AddVideoModal({
  title,
  handleResult,
}) {

  const { close } = useContext(ModalContext);

  const [url, setUrl] = useState("");

  const handlePrevious = () => {
    close();
  };

  const handleNext = () => {
    handleResult(sections);
    close();
  };

  const handleAddVideo = () => {
    handleResult(sections);
    close();
  };

  return (
    <div className={styles.sectionsModal}>
      <div>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
        </div>

        <div className={styles.content}>
          <div className={styles.url}>
            <InputText placeholder="Pega aquí el enlace de YouTube" value={url} onChange={setUrl}></InputText>
          </div>
          <div className={styles.addButton} >
            <ButtonPrimary onClick={handleAddVideo} label="Agregar" />
          </div>
        </div>


        <div className={styles.footer}>
          <div>
            <ButtonLink onClick={handlePrevious} label="Cancelar" />
            <ButtonPrimary onClick={handleNext} label="Aceptar" />
          </div>
        </div>
      </div>
    </div>
  );
}
