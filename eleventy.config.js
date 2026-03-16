import yaml from "js-yaml";
import filters from "./config/filters.js";
import collections from "./config/collections.js";

// Prevent dates without timezone (e.g., in blog posts) from getting mangled
process.env.TZ = "UTC";

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml,yml", (contents) =>
    yaml.load(contents),
  );

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
  eleventyConfig.addPassthroughCopy("app/assets/lib");
  eleventyConfig.addPassthroughCopy("app/assets/javascripts");
  eleventyConfig.addPassthroughCopy("app/assets/css/post-content.css");
  eleventyConfig.addPassthroughCopy("app/assets/css/blog-search.css");
  eleventyConfig.addPassthroughCopy("app/assets/css/interview-series.css");
  eleventyConfig.addPassthroughCopy("app/century-scale-storage");
  eleventyConfig.addPassthroughCopy("app/open-french-law-rag");
  eleventyConfig.addPassthroughCopy("app/data-gov-archive");
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
