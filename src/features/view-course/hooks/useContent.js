import { getCourseContent, postAnswer } from "@/services/course.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useContent = () => {
  const params = useParams();
  const { courseId, sectionId } = params;

  const [content, setContent] = useState([]);

  useEffect(() => {
    console.log(content);
  }, [content]);

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
    postAnswer({ courseId, sectionId, contentId, answerTry }).then(
      ({ result }) => {
        setContent((oldContent) => {
          const content = JSON.parse(JSON.stringify(oldContent));
          content[i].result = result;
          return content;
        });
      }
    );
  };

  return { content, setAnswerAt, checkAnswerAt };
};
