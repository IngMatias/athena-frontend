import { ContentType } from "@/features/create-course/enum/ContentType";
import IconTooltip from "../iconTooltip/iconTooltip";

import styles from "./actionsBetweenExercises.module.css";

export default function ActionsBetweenExercises({
  type,
  onAddEmptyText,
  onAddTrueFalse,
  onAddMultipleChoice,
  onElaborateMore,
  onAddMindMap,
}) {
  return (
    <div className={styles.actionsBetweenExercises}>
      <IconTooltip onClick={onAddEmptyText} icon="text_snippet">
        Agregar texto vacío
      </IconTooltip>

      {ContentType.TEXT === type && (
        <>
          <IconTooltip onClick={onElaborateMore} icon="more">
            Expandir texto
          </IconTooltip>

          <IconTooltip onClick={onAddTrueFalse} icon="rule">
            Generar Verdadero Falso basado en el texto.
          </IconTooltip>

          <IconTooltip
            onClick={onAddMultipleChoice}
            icon="radio_button_checked"
          >
            Generar Múltiple Opcion basado en el texto.
          </IconTooltip>

          <IconTooltip onClick={onAddMindMap} icon="account_tree">
            Generar Mapa Mental basado en el texto.
          </IconTooltip>
        </>
      )}
    </div>
  );
}
