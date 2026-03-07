import { toolApi } from "../../../services/toolApi";

export const mergeService = {
  merge: (files) => toolApi.mergePdfs(files),
};
