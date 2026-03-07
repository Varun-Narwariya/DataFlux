import { useReducer, useCallback } from "react";
import { toolReducer, initialToolState, TOOL_STATUS } from "./toolState";

export function useToolProcessor() {
  const [state, dispatch] = useReducer(toolReducer, initialToolState);

  const process = useCallback(async (serviceFn, options = {}) => {
    dispatch({ type: "PROCESSING_START" });

    // Simulate progress ticks while awaiting
    const ticker = setInterval(() => {
      dispatch((s) => {
        if (s.progress < 85) {
          return { type: "PROCESSING_PROGRESS", payload: s.progress + 5 };
        }
        return s;
      });
    }, 300);

    try {
      const result = await serviceFn(options);
      clearInterval(ticker);
      dispatch({ type: "PROCESSING_DONE", payload: result });
      return result;
    } catch (err) {
      clearInterval(ticker);
      dispatch({ type: "PROCESSING_ERROR", payload: err.message || "Processing failed." });
      return null;
    }
  }, []);

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const downloadResult = useCallback(() => {
    if (!state.result) return;
    const url = URL.createObjectURL(state.result);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dataflux-result.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }, [state.result]);

  return {
    status: state.status,
    progress: state.progress,
    result: state.result,
    error: state.error,
    isIdle: state.status === TOOL_STATUS.IDLE,
    isProcessing: state.status === TOOL_STATUS.PROCESSING,
    isDone: state.status === TOOL_STATUS.DONE,
    isError: state.status === TOOL_STATUS.ERROR,
    process,
    reset,
    downloadResult,
    dispatch,
  };
}
