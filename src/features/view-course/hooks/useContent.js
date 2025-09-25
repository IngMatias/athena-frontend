import { getCourseContent, postAnswer } from "@/services/course.service";
import { updateCompleted } from "@/utils/sections";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useContent = ({setSections}) => {
  const params = useParams();
  const { courseId, sectionId } = params;

  const [content, setContent] = useState([]);

  useEffect(() => {
    if (!courseId || !sectionId) return;
    getCourseContent({ courseId, sectionId }).then(({ content }) => {
      setContent(content);
    });
  }, [courseId, sectionId]);

  const setAnswerAt = (i, answer) => {
    setContent((oldContent) => {
      const content = JSON.parse(JSON.stringify(oldContent));
      content[i].answer = answer;
      return content;
    });
  };

  const checkAnswerAt = (i) => {
    const { id: contentId, answer: answerTry } = content[i];
    return postAnswer({ courseId, sectionId, contentId, answerTry }).then(
      ({ result }) => {
        setContent((oldContent) => {
          const content = JSON.parse(JSON.stringify(oldContent));
          content[i].result = result;
          return content;
        });
        if (result)
          setSections((sections) => {
            const newSections = JSON.parse(JSON.stringify(sections));
            updateCompleted(newSections, sectionId, 1)

            return newSections
          })
      }
    );
  };

  return { content, setAnswerAt, checkAnswerAt };
};
