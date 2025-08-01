"use client";
import React, { useEffect } from "react";
import { useDetails } from "../hooks/useDetails";
import { useSectionsWebsocket } from "../hooks/useSectionsWebsocket";
import { useContentWebsocket } from "../hooks/useContentWebsocket";

import { socket } from "@/utils/websocket";
import { useParams } from "next/navigation";
import { useImage } from "../hooks/useImage";

export const CourseContext = React.createContext({});

export default function CourseContextProvider({ children }) {
  const params = useParams();
  const { courseId } = params;

  useEffect(() => {
    socket.emit("join-participants", courseId);

    socket.on("set-participants", (participants) => {
      // console.log("participants", participants);
    });

    socket.on("error", (err) => {
      console.log("Websocket error", err);
    });
  }, []);

  const {
    title,
    description,
    setTitle,
    setDescription,
    titleWordsCount,
    descriptionWordsCount,
    titleWordsMax,
    descriptionWordsMax,
    options,
    tags,
    toggleTag,
    contains,
    setContains,
    inSearching,
    saveDetails,
  } = useDetails();

  const { imagePreview, setImage, saveImage } = useImage();

  const {
    sections,
    firstLeaf,
    path,
    openedSections,
    handleSetSections,
    handleAdd,
    handleTitleChange,
    handleDelete,
    toggleSectionOpen,
  } = useSectionsWebsocket();

  const {
    content,
    setContentAt,
    addEmptyTextAt,
    addKeypoints,
    elaborateMoreAt,
    addExerciseAt,
    addMindMapAt,
    deleteContentAt,
    saveContent,
  } = useContentWebsocket();

  return (
    <CourseContext.Provider
      value={{
        title,
        description,
        setTitle,
        setDescription,
        titleWordsCount,
        descriptionWordsCount,
        titleWordsMax,
        descriptionWordsMax,
        options,
        imagePreview,
        setImage,
        saveImage,
        tags,
        toggleTag,
        contains,
        setContains,
        inSearching,
        saveDetails,
        sections,
        handleSetSections,
        firstLeaf,
        path,
        openedSections,
        handleAdd,
        handleTitleChange,
        handleDelete,
        toggleSectionOpen,
        content,
        elaborateMoreAt,
        setContentAt,
        addKeypoints,
        addEmptyTextAt,
        addExerciseAt,
        addMindMapAt,
        deleteContentAt,
        saveContent,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
