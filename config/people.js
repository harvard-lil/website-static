
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import Image from "@11ty/eleventy-img";

const SOURCE_DIR = "app/assets/people";
const SIZES = [216, 432, 648];

function outputPath(size, filename) {
  return `build/assets/thumbs/${size}x${size}c/${filename}`;
}

function fileIsUpToDate(sourcePath, filename) {
  const sourceModified = statSync(sourcePath).mtimeMs;
  return SIZES.every((size) => {
    const output = outputPath(size, filename);
    return existsSync(output) && statSync(output).mtimeMs >= sourceModified;
  });
}

async function resizePhoto(sourcePath, filename) {
  for (const size of SIZES) {
    const metadata = await Image(sourcePath, {
      widths: [size],
      formats: ["jpeg"],
      outputDir: path.dirname(outputPath(size, filename)),
      filenameFormat: () => filename,
      sharpJpegOptions: { quality: 85 },
      // Keep cache disabled so we catch updates to existing photos
      useCache: false,
    });
    const { width, height } = metadata.jpeg[0];
    if (width !== size || height !== size) {
      throw new Error(
        `${sourcePath} must be square and at least ${Math.max(...SIZES)}px wide (resized to ${width}x${height})`,
      );
    }
  }
}

export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget(SOURCE_DIR);

  eleventyConfig.on("eleventy.before", async () => {
    const filenames = readdirSync(SOURCE_DIR).filter((file) => file.endsWith(".jpg"));
    for (const filename of filenames) {
      const sourcePath = path.join(SOURCE_DIR, filename);
      if (!fileIsUpToDate(sourcePath, filename)) {
        await resizePhoto(sourcePath, filename);
      }
    }
  });
}
