"use client";
import React from "react";
import { useSelection } from "../hooks/useSelection";

export const SelectionContext = React.createContext({});

export const SelectionContextProvider = ({ children }) => {
  const { selection, selectionElement, selectionIsEmpty } = useSelection();

  return (
    <SelectionContext.Provider
      value={{
        selection,
        selectionElement,
        selectionIsEmpty,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
