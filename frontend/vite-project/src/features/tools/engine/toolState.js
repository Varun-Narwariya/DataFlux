export const TOOL_STATUS = {
  IDLE: "idle",
  UPLOADING: "uploading",
  PROCESSING: "processing",
  DONE: "done",
  ERROR: "error",
};

export const initialToolState = {
  files: [],
  status: TOOL_STATUS.IDLE,
  progress: 0,
  result: null,
  error: null,
  options: {},
};

export function toolReducer(state, action) {
  switch (action.type) {
    case "SET_FILES":
      return { ...state, files: action.payload, status: TOOL_STATUS.IDLE, result: null, error: null };

    case "ADD_FILES":
      return { ...state, files: [...state.files, ...action.payload] };

    case "REMOVE_FILE":
      return { ...state, files: state.files.filter((_, i) => i !== action.payload) };

    case "REORDER_FILES":
      return { ...state, files: action.payload };

    case "SET_OPTIONS":
      return { ...state, options: { ...state.options, ...action.payload } };

    case "PROCESSING_START":
      return { ...state, status: TOOL_STATUS.PROCESSING, progress: 0, error: null };

    case "PROCESSING_PROGRESS":
      return { ...state, progress: action.payload };

    case "PROCESSING_DONE":
      return { ...state, status: TOOL_STATUS.DONE, progress: 100, result: action.payload };

    case "PROCESSING_ERROR":
      return { ...state, status: TOOL_STATUS.ERROR, error: action.payload };

    case "RESET":
      return { ...initialToolState };

    default:
      return state;
  }
}
