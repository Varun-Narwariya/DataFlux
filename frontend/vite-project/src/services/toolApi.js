import { apiClient } from "./apiClient";

export const toolApi = {
  mergePdfs: (files) => {
    const form = new FormData();
    files.forEach((f) => form.append("files", f));
    return apiClient.post("/tools/merge", form);
  },

  splitPdf: (file, ranges) => {
    const form = new FormData();
    form.append("file", file);
    form.append("ranges", JSON.stringify(ranges));
    return apiClient.post("/tools/split", form);
  },

  compressPdf: (file, quality = "recommended") => {
    const form = new FormData();
    form.append("file", file);
    form.append("quality", quality);
    return apiClient.post("/tools/compress", form);
  },

  convertToPdf: (file, fromType) => {
    const form = new FormData();
    form.append("file", file);
    form.append("fromType", fromType);
    return apiClient.post("/tools/convert/to-pdf", form);
  },

  convertFromPdf: (file, toType) => {
    const form = new FormData();
    form.append("file", file);
    form.append("toType", toType);
    return apiClient.post("/tools/convert/from-pdf", form);
  },

  rotatePdf: (file, degrees, pages = "all") => {
    const form = new FormData();
    form.append("file", file);
    form.append("degrees", degrees);
    form.append("pages", pages);
    return apiClient.post("/tools/rotate", form);
  },

  protectPdf: (file, password) => {
    const form = new FormData();
    form.append("file", file);
    form.append("password", password);
    return apiClient.post("/tools/protect", form);
  },

  unlockPdf: (file, password) => {
    const form = new FormData();
    form.append("file", file);
    form.append("password", password);
    return apiClient.post("/tools/unlock", form);
  },

  addWatermark: (file, text, options = {}) => {
    const form = new FormData();
    form.append("file", file);
    form.append("text", text);
    form.append("options", JSON.stringify(options));
    return apiClient.post("/tools/watermark", form);
  },

  ocrPdf: (file, language = "eng") => {
    const form = new FormData();
    form.append("file", file);
    form.append("language", language);
    return apiClient.post("/tools/ocr", form);
  },
};
