import React, { useContext } from "react";

import { ModalContext } from "@/stores/ModalContextProvider";
import styles from "./referencesModal.module.css";

export default function ReferencesModal({ message }) {

  return (
    <div className={styles.referencesModal}>
      <div className={styles.header}>
        <div className={styles.title}>Resultado generado por IA</div>
      </div>

      <div className={styles.section}>
        <div className={styles.subtitle}>Texto generado</div>

        <div className={styles.message}>{message.content}</div>
      </div>

      <div className={styles.section}>
        <div>
          <div className={styles.subtitle}>Referencias utilizadas</div>
          <div className={styles.description}>
            A continuación se listan las fuentes en las que se basó la IA para
            generar el contenido anterior:
          </div>
        </div>

        <div className={styles.refs}>
          {message.refs.map((r, i) => (
            <div key={i}>
              <div className={styles.fileName}>{r.fileName}</div>
              <div className={styles.content}>{r.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
