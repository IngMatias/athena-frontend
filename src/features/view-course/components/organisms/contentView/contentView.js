import React, { useContext, useEffect } from "react";

import styles from "./contentView.module.css";
import { ViewCourseContext } from "@/features/view-course/stores/ViewCourseContextProvider";
import FollowMouseBox from "@/features/create-course/components/organisms/followMouseBox/followMouseBox";
import ContentComponent from "../contentComponent/contentComponent";

export default function ContentView() {
  const { content, setAnswerAt, checkAnswerAt } = useContext(ViewCourseContext);

  const handleOnChangeAnswer = ({ index, answer }) => {
    setAnswerAt(index, answer);
  };

  const handleCheckAnswer = ({ index }) => {
    checkAnswerAt(index);
  };

  return (
    <div className={styles.contentCreator}>
      <div>
        {content.map((c, index) => {
          return (
            <div key={c.id}>
              <ContentComponent
                index={index}
                content={c}
                onChangeAnswer={handleOnChangeAnswer}
                onCheckAnswer={handleCheckAnswer}
              />
            </div>
          );
        })}
      </div>

      <FollowMouseBox>{/* TODO */}</FollowMouseBox>
    </div>
  );
}
