import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const zipFilePath = path.join(process.cwd(), "public", ".next.zip");

  try {
    const stats = await fs.promises.stat(zipFilePath);
    const fileSize = stats.size;
    console.log("fileSize", fileSize);
    res.setHeader("Content-Disposition", 'attachment; filename=".next.zip"');
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Length", fileSize);

    const readStream = fs.createReadStream(zipFilePath);
    readStream.pipe(res);
  } catch (err) {
    res.status(500).send(`Error reading .next.zip file: ${err.message}`);
  }
}
