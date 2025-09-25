import { useSections as useLocalSections } from "@/features/create-course/hooks/useSections";
import { findPathById } from "@/features/create-course/hooks/useSectionsWebsocket";
import { getCourseSections } from "@/services/course.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSections = () => {
  const params = useParams();
  const { courseId, sectionId } = params;
  const [path, setPath] = useState([]);
  const [completed, setCompleted] = useState([]);

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
    const excCompleted = sections.reduce((acc, section) => acc + section.completed, 0);
    const excTotal = sections.reduce((acc, section) => acc + section.total, 0);
    
    setCompleted(excCompleted == excTotal)

  }, [sections])

  const addCompletedExc = () => {
    console.log('sectionId', sectionId)
    console.log('sections', sections)
  }

  useEffect(() => {
    getCourseSections({ courseId }).then(({ sections }) => {
      setSections(sections);
    });
  }, [courseId]);

  return {
    completed,
    sections,
    setSections,
    firstLeaf,
    path,
    openedSections,
    toggleSectionOpen,
    addCompletedExc
  };
};
