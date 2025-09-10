import React from "react";

import { ContentType } from "@/features/create-course/enum/ContentType";

import styles from "./contentComponent.module.css";
import MindMapContent from "@/features/create-course/components/atoms/mindMapContent/mindMapContent";
import MultipleChoiceContent from "@/features/create-course/components/molecules/multipleChoiceContent/multipleChoiceContent";
import TextContent from "../../atoms/textContent/textContent";
import TrueFalseContent from "../../molecules/trueFalseContent/trueFalseContent";
import { postAnswer } from "@/services/course.service";

export default function ContentComponent({
  index,
  content,
  onChangeAnswer,
  onCheckAnswer,
  completed,
}) {
  const handleChangeAnswer = ({ answer }) => {
    onChangeAnswer({
      index,
      answer,
    });
  };

  const handleCheck = () => {
    onCheckAnswer({
      index,
    });
  };

  return (
    <div className={styles.contentComponent}>
      <div>
        {content.type === ContentType.TEXT && (
          <TextContent text={content.text} />
        )}
        {content.type === ContentType.MINDMAP && (
          <MindMapContent
            id={content.id}
            nodes={content.nodes}
            edges={content.edges}
            onChange={handleChange}
          />
        )}
        {content.type === ContentType.TRUE_FALSE && (
          <TrueFalseContent
            id={content.id}
            text={content.text}
            answer={content.answer}
            type={content.type}
            onChangeAnswer={handleChangeAnswer}
          />
        )}
        {content.type === ContentType.MULTPLE_CHOICE && (
          <MultipleChoiceContent
            id={content.id}
            text={content.text}
            options={content.options}
            answer={content.answer}
            type={content.type}
            onChange={handleChange}
          />
        )}
        {[ContentType.TRUE_FALSE].includes(content.type) && (
          <div>
            {!completed && !content.result && <button onClick={handleCheck}>Corregir</button>}
            <div>
              {content.result != undefined &&
                (content.result ? "Correct Answer" : "Wrong Answer")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
