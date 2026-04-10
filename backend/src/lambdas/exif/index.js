import fs from "fs/promises";
import exifParser from "exif-parser";

export default async function handler({ imagePath }) {
  if (!imagePath) {
    throw new Error("imagePath required");
  }

  const buffer = await fs.readFile(imagePath);
  const parser = exifParser.create(buffer);
  const result = parser.parse();

  console.log("EXIF extracted");

  return {
    success: true,
    metadata: result.tags
  };
}