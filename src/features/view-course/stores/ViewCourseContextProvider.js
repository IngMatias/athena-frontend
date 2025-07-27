import React from "react";
import { useDetails } from "@/features/create-course/hooks/useDetails";
import { useParams } from "next/navigation";
import { useImage } from "@/features/create-course/hooks/useImage";
import { useSections } from "../hooks/useSections";
import { useContent } from "../hooks/useContent";

export const ViewCourseContext = React.createContext({});

export default function ViewCourseContextProvider({ children }) {
  const { title, description, tags } = useDetails();

  const { imagePreview } = useImage();

  const { sections, firstLeaf, openedSections, toggleSectionOpen } =
    useSections();

  const { content } = useContent();

  return (
    <ViewCourseContext.Provider
      value={{
        title,
        description,
        imagePreview,
        tags,
        sections,
        firstLeaf,
        openedSections,
        toggleSectionOpen,
        content,
      }}
    >
      {children}
    </ViewCourseContext.Provider>
  );
}
