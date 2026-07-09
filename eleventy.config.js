import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import yaml from "js-yaml";

import assets from "./config/assets.js";
import filters from "./config/filters.js";
import collections from "./config/collections.js";

// Prevent dates without timezone (e.g., in blog posts) from getting mangled
process.env.TZ = "UTC";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addDataExtension("yaml,yml", (contents) =>
    yaml.load(contents),
  );

  eleventyConfig.addGlobalData("assets", assets);

  eleventyConfig.addGlobalData("eleventyComputed", {
    slug: (data) => data.slug || data.page.fileSlug,
    eleventyExcludeFromCollections: (data) => {
      if (data.published === false) return true;
      return data.eleventyExcludeFromCollections;
    },
    permalink: (data) => {
      if (data.published === false) return false;
      return data.permalink;
    },
  });

  eleventyConfig.addPassthroughCopy("app/assets/images");
  eleventyConfig.addPassthroughCopy("app/assets/fonts");
  eleventyConfig.addPassthroughCopy("app/assets/thumbs");
  eleventyConfig.addPassthroughCopy({
    "node_modules/gsap/dist/gsap.min.js": "assets/lib/gsap.min.js",
    "node_modules/swup/dist/Swup.umd.js": "assets/lib/Swup.umd.js",
    "node_modules/@swup/head-plugin/dist/index.umd.js": "assets/lib/swup-head-plugin.umd.js",
  });
  eleventyConfig.addPassthroughCopy("app/assets/javascripts");
  eleventyConfig.addPassthroughCopy("app/assets/css/post-content.css");
  eleventyConfig.addPassthroughCopy("app/assets/css/syntax.css");
  eleventyConfig.addPassthroughCopy("app/assets/css/blog-search.css");
  eleventyConfig.addPassthroughCopy("app/assets/css/interview-series.css");
  eleventyConfig.addPassthroughCopy("app/century-scale-storage");
  eleventyConfig.addPassthroughCopy("app/open-french-law-rag");
  eleventyConfig.addPassthroughCopy("app/generational-data-interviews/assets");
  eleventyConfig.addPassthroughCopy("app/generational-data-interviews/main.js");

  filters(eleventyConfig);
  collections(eleventyConfig);

  eleventyConfig.setServerOptions({ showAllHosts: true });
  eleventyConfig.addWatchTarget("app/assets/css/");

  eleventyConfig.ignores.add("**/README.md");

  return {
    dir: {
      input: "app",
      output: "build",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    templateFormats: ["html", "liquid", "md", "json", "webmanifest", "txt"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
  };
}
