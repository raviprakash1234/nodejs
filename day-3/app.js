import * as os from "node:os";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));

const outputDir = join(currentDir, "output");

const reportPath = join(outputDir, "system-report.txt");
console.log("reportPath:", reportPath);

async function main() {
  const report = [
    `Hostname: ${os.hostname()}`,
    `Platform: ${os.platform()}`,
    `Architecture: ${os.arch()}`,
    `CPU cores: ${os.cpus().length}`,
    `Total RAM (GB): ${(os.totalmem() / 1024 ** 3).toFixed(2)}`,
    `Free RAM (GB): ${(os.freemem() / 1024 ** 3).toFixed(2)}`,
    `Uptime (hours): ${(os.uptime() / 3600).toFixed(2)}`,
  ].join("\n");
  // Create output directory if it doesn't exist
  await mkdir(outputDir, { recursive: true });

  // Save the report
  await writeFile(reportPath, report, "utf8");

  // Read the saved report
  const savedReport = await readFile(reportPath, "utf8");

  console.log(savedReport);
  console.log(`\nReport saved at: ${reportPath}`);
}

main().catch((error) => {
  console.error("Could not create system report:", error);
  process.exitCode = 1;
});

const inputDir = join(currentDir, "input");

const samplePath = join(inputDir, "sample.txt");

async function readInputFile() {
  const text = await readFile(samplePath, "utf-8");
  console.log("text:", text);
  console.log(text.length);
}

readInputFile().catch((error) => {
  console.error("Could not read input file:", error);
  process.exitCode = 1;
});
