import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";

function version(pkg) {
  return JSON.parse(readFileSync(`node_modules/${pkg}/package.json`, "utf8")).version;
}

function hash(path) {
  if (!existsSync(path)) return Date.now().toString(36);
  return createHash("md5").update(readFileSync(path)).digest("hex").slice(0, 8);
}

export default function () {
  const hashes = {};
  for (const file of readdirSync("app/assets/css").filter((f) => f.endsWith(".css"))) {
    hashes[file] = hash(`app/assets/css/${file}`);
  }
  for (const file of readdirSync("app/assets/javascripts").filter((f) => f.endsWith(".js"))) {
    hashes[file] = hash(`app/assets/javascripts/${file}`);
  }
  hashes["main.css"] = hash("build/assets/css/main.css");

  return {
    libs: {
      gsap: version("gsap"),
      swup: version("swup"),
      swupHeadPlugin: version("@swup/head-plugin"),
    },
    hashes,
  };
}
