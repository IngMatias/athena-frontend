import { getCourseContent } from "@/services/course.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useContent = () => {
  const params = useParams();
  const { courseId, sectionId } = params;

  const [content, setContent] = useState([]);

  useEffect(() => {
    getCourseContent({ courseId, sectionId }).then(({ content }) => {
      setContent(content);
    });
  }, []);

  return { content };
};
