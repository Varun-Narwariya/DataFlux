import { toolApi } from "../../../../services/toolApi";

export const convertService = {
  pdfToPpt: (file) => toolApi.convertFromPdf(file, "ppt"),
  pdfToWord: (file) => toolApi.convertFromPdf(file, "word"),
  pdfToExcel: (file) => toolApi.convertFromPdf(file, "excel"),
  pdfToJpg: (file) => toolApi.convertFromPdf(file, "jpg"),
  wordToPdf: (file) => toolApi.convertToPdf(file, "word"),
  pptToPdf: (file) => toolApi.convertToPdf(file, "ppt"),
  excelToPdf: (file) => toolApi.convertToPdf(file, "excel"),
  jpgToPdf: (files) => toolApi.convertToPdf(files, "jpg"),
};
