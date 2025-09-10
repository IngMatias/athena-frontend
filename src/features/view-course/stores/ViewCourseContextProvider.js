import React, { useEffect } from "react";
import { useDetails } from "@/features/create-course/hooks/useDetails";
import { useImage } from "@/features/create-course/hooks/useImage";
import { useSections } from "../hooks/useSections";
import { useContent } from "../hooks/useContent";
import { useCertificate } from "../hooks/useCertificate";
import { useEnrollment } from "../hooks/useEnrollment";

export const ViewCourseContext = React.createContext({});

export default function ViewCourseContextProvider({ children }) {
  const { title, description, tags } = useDetails();

  const { imagePreview } = useImage();

  const { enrolled, handleEnroll } = useEnrollment();

  const { sections, firstLeaf, path, openedSections, toggleSectionOpen } =
    useSections();

  const { content, setAnswerAt, checkAnswerAt } = useContent();

  const { checkCertificate } = useCertificate();

  return (
    <ViewCourseContext.Provider
      value={{
        title,
        description,
        imagePreview,
        tags,
        sections,
        firstLeaf,
        enrolled,
        path,
        openedSections,
        checkCertificate,
        toggleSectionOpen,
        handleEnroll,
        content,
        setAnswerAt,
        checkAnswerAt,
      }}
    >
      {children}
    </ViewCourseContext.Provider>
  );
}
