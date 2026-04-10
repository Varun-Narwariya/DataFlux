import { PDFDocument } from "pdf-lib";
import { StorageService } from "../../services/storage/index.js";
import { JobModel } from "../../models/postgreSQL/jobs.model.js";

export default async function handler({ jobId, inputKey, outputKey }) {
  if (jobId && inputKey && outputKey) {
    throw new Error("jobId, inputKey and outputKey required");
  }

  try {
    // 🔥 mark as processing (optional but good)
    await JobModel.markProcessing(jobId);

    // 1. Download file
    const buffer = await StorageService.download(inputKey, "uploads");

    // 2. Load PDF
    const pdf = await PDFDocument.load(buffer);
    const totalPages = pdf.getPageCount();

    // 3. Split pages
    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(page);

      const bytes = await newPdf.save();

      await StorageService.upload(
        `${outputKey}/page-${i + 1}.pdf`,
        bytes,
        "application/pdf",
        "outputs"
      );
    }

    console.log("PDF split complete");

    // ✅ THIS IS THE KEY FIX
    await JobModel.markCompleted(jobId, outputKey);

    return { success: true };

  } catch (err) {
    console.error("Lambda error:", err);

    // ✅ HANDLE FAILURE PROPERLY
    await JobModel.markFailed(jobId, err.message);

    throw err;
  }
}