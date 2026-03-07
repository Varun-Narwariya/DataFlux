import { useReducer, useCallback } from "react";
import { toolReducer, initialToolState } from "./toolState";

export function useFileUpload({ accept = "*", multiple = false, maxSizeMB = 100 } = {}) {
  const [state, dispatch] = useReducer(toolReducer, initialToolState);

  const validateFile = (file) => {
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      return `${file.name} exceeds the ${maxSizeMB}MB limit.`;
    }
    if (accept !== "*") {
      const exts = accept.split(",").map((e) => e.trim().toLowerCase());
      const fileExt = "." + file.name.split(".").pop().toLowerCase();
      if (!exts.includes(fileExt)) {
        return `${file.name} is not a supported file type.`;
      }
    }
    return null;
  };

  const addFiles = useCallback((incomingFiles) => {
    const fileArray = Array.from(incomingFiles);
    const errors = fileArray.map(validateFile).filter(Boolean);
    if (errors.length) {
      dispatch({ type: "PROCESSING_ERROR", payload: errors.join(" ") });
      return false;
    }
    const selected = multiple ? fileArray : [fileArray[0]];
    dispatch({ type: multiple ? "ADD_FILES" : "SET_FILES", payload: selected });
    return true;
  }, [multiple, accept, maxSizeMB]);

  const removeFile = useCallback((index) => {
    dispatch({ type: "REMOVE_FILE", payload: index });
  }, []);

  const reorderFiles = useCallback((reordered) => {
    dispatch({ type: "REORDER_FILES", payload: reordered });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleInputChange = useCallback((e) => {
    addFiles(e.target.files);
    e.target.value = "";
  }, [addFiles]);

  return {
    files: state.files,
    error: state.error,
    addFiles,
    removeFile,
    reorderFiles,
    reset,
    handleDrop,
    handleInputChange,
    dispatch,
  };
}
