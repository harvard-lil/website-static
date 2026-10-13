import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import Image from "@11ty/eleventy-img";

const SOURCE_DIR = "app/assets/projects";
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

const SIZES = {
  "hero-wide": [
    { width: 800, folder: "800x450r" },
    { width: 1200, folder: "1200x675r" },
    { width: 1600, folder: "1600x900r" },
    { width: 2100, folder: "2100x1000r" },
  ],
  "hero-square": [
    { width: 400, folder: "400x400r" },
    { width: 800, folder: "800x800r" },
  ],
};

function resizedFilename(filename) {
  return `${path.parse(filename).name}.webp`;
}

function outputPath(folder, filename) {
  return `build/assets/thumbs/${folder}/${resizedFilename(filename)}`;
}

function fileIsUpToDate(sourcePath, filename, sizes) {
  const sourceModified = statSync(sourcePath).mtimeMs;
  return sizes.every(({ folder }) => {
    const output = outputPath(folder, filename);
    return existsSync(output) && statSync(output).mtimeMs >= sourceModified;
  });
}

async function resizeImage(sourcePath, filename, sizes) {
  for (const { width, folder } of sizes) {
    const metadata = await Image(sourcePath, {
      widths: [width],
      formats: ["webp"],
      outputDir: path.dirname(outputPath(folder, filename)),
      filenameFormat: () => resizedFilename(filename),
      sharpWebpOptions: { quality: 90 },
      // Keep cache disabled so we catch updates to existing images
      useCache: false,
    });
    const [output] = metadata.webp;
    if (output.width !== width) {
      throw new Error(
        `${sourcePath} must be at least ${Math.max(...sizes.map((size) => size.width))}px wide (resized to ${output.width}px)`,
      );
    }
  }
}

export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget(SOURCE_DIR);

  eleventyConfig.addFilter("resized_filename", resizedFilename);

  eleventyConfig.on("eleventy.before", async () => {
    for (const [subfolder, sizes] of Object.entries(SIZES)) {
      const directory = path.join(SOURCE_DIR, subfolder);
      const filenames = readdirSync(directory).filter((file) =>
        IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()),
      );
      for (const filename of filenames) {
        const sourcePath = path.join(directory, filename);
        if (!fileIsUpToDate(sourcePath, filename, sizes)) {
          await resizeImage(sourcePath, filename, sizes);
        }
      }
    }
  });
}
