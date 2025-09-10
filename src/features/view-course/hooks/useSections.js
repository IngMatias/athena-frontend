import { useSections as useLocalSections } from "@/features/create-course/hooks/useSections";
import { findPathById } from "@/features/create-course/hooks/useSectionsWebsocket";
import { getCourseSections } from "@/services/course.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSections = () => {
  const params = useParams();
  const { courseId, sectionId } = params;
  const [path, setPath] = useState([]);

  const {
    sections,
    setSections,
    firstLeaf,
    openedSections,
    toggleSectionOpen,
  } = useLocalSections();

  useEffect(() => {
    if (sections && sectionId) {
      const path = findPathById(sections, sectionId);

      if (path) {
        setPath(path);
      }
    }
  }, [sections, sectionId]);

  useEffect(() => {
    getCourseSections({ courseId }).then(({ sections }) => {
      setSections(sections);
    });
  }, [courseId]);

  return {
    sections,
    firstLeaf,
    path,
    openedSections,
    toggleSectionOpen,
  };
};
