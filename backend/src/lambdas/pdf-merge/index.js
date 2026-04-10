import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";

export default async function handler({ inputKeys, outputPath = "./tmp/merged.pdf" }) {
  if (!inputKeys || !inputKeys.length) {
    throw new Error("inputKeys required");
  }

  const mergedPdf = await PDFDocument.create();

  for (const filePath of inputKeys) {
    const file = await fs.readFile(filePath);
    const pdf = await PDFDocument.load(file);

    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(p => mergedPdf.addPage(p));
  }

  const bytes = await mergedPdf.save();
  await fs.writeFile(outputPath, bytes);

  console.log("PDF merged");

  return { success: true, outputPath };
}