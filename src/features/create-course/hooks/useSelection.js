import { useEffect, useState } from "react";

export const useSelection = () => {
  const [selection, setSelection] = useState("");
  const [selectionElement, setSelectionElement] = useState(null);
  const selectionIsEmpty = selection.trim().length === 0;

  const handleSelectChange = () => {
    const selection = window.getSelection();

    setSelection(selection.toString());

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let containerElement = range.commonAncestorContainer;
      containerElement =
        containerElement.nodeType === window.Node.TEXT_NODE
          ? containerElement.parentElement
          : containerElement;
      setSelectionElement(containerElement);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleSelectChange);
    document.addEventListener("mouseup", handleSelectChange);
    return () => {
      window.removeEventListener("click", handleSelectChange);
      document.removeEventListener("mouseup", handleSelectChange);
    };
  }, []);

  return { selection, selectionElement, selectionIsEmpty };
};
