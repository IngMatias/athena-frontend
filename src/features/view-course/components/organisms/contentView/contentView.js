import React, { useContext } from "react";

import styles from "./contentView.module.css";
import { CourseContext } from "@/features/create-course/stores/CourseContextProvider";
import { ViewCourseContext } from "@/features/view-course/stores/ViewCourseContextProvider";
import ContentComponent from "@/features/create-course/components/organisms/contentComponent/contentComponent";
import FollowMouseBox from "@/features/create-course/components/organisms/followMouseBox/followMouseBox";

export default function ContentView() {
  const { content } = useContext(ViewCourseContext);

  const {
    path,
    addKeypoints,
    elaborateMoreAt,
    setContentAt,
    addEmptyTextAt,
    addExerciseAt,
    addMindMapAt,
    deleteContentAt,
  } = useContext(CourseContext);

  const handleGenerateKeyPoints = () => {
    addKeypoints(path);
  };

  const handleElaborateMore = ({ index }) => {
    elaborateMoreAt(index);
  };

  const handleAddEmptyText = ({ index }) => {
    addEmptyTextAt(index);
  };

  const handleOnChange = ({ index, content }) => {
    setContentAt(index, content);
  };

  const handleOnDelete = ({ index }) => {
    deleteContentAt(index);
  };

  const handleAddTrueFalseWithSelected = (e) => {
    addExerciseAt(selectionElement.dataset.index, {
      numberOfExercises: 3,
      type: "TRUE_FALSE",
      difficulty: "MEDIUM",
      text: selection,
      language: "en_US",
    });
  };

  const handleAddMultipleChoiceWithSelected = (e) => {
    addExerciseAt(selectionElement.dataset.index, {
      numberOfExercises: 3,
      type: "MULTIPLE_CHOICE",
      difficulty: "MEDIUM",
      text: selection,
      numberOfOptions: 5,
      language: "en_US",
    });
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
                onAddMultipleChoice={handleAddMultipleChoice}
                onAddMindMap={handleAddMindMap}
              />
            </div>
          );
        })}
      </div>

      <FollowMouseBox>{/* TODO */}</FollowMouseBox>
    </div>
  );
}
