import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";

export default async function handler({ imagePaths, outputPath = "./tmp/output.pdf" }) {
  if (!imagePaths || !imagePaths.length) {
    throw new Error("imagePaths required");
  }

  const pdfDoc = await PDFDocument.create();

  for (const imgPath of imagePaths) {
    const imageBytes = await fs.readFile(imgPath);

    let image;
    if (imgPath.endsWith(".png")) {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      image = await pdfDoc.embedJpg(imageBytes);
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(outputPath, pdfBytes);

  console.log("Images converted to PDF");

  return { success: true, outputPath };
}