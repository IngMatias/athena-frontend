import { useSections as useLocalSections } from "@/features/create-course/hooks/useSections";
import { getCourseSections } from "@/services/course.service";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const useSections = () => {
  const params = useParams();
  const { courseId } = params;

  const {
    sections,
    setSections,
    firstLeaf,
    openedSections,
    toggleSectionOpen,
  } = useLocalSections();

  useEffect(() => {
    getCourseSections({ courseId }).then(({ sections }) => {
      setSections(sections);
    });
  }, [courseId]);

  return {
    sections,
    firstLeaf,
    openedSections,
    toggleSectionOpen,
  };
};
