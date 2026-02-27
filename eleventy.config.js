const markdownIt = require("markdown-it");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  const md = markdownIt({ html: true, linkify: true, typographer: true });

  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

  // Respect Jekyll's `published: false` convention
  eleventyConfig.addGlobalData("eleventyComputed", {
    eleventyExcludeFromCollections: (data) => {
      if (data.published === false) return true;
      return data.eleventyExcludeFromCollections;
    },
    permalink: (data) => {
      if (data.published === false) return false;
      return data.permalink;
    },
  });

  // --- Passthrough copy ---
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

  // --- Jekyll-compatible Liquid filters ---

  eleventyConfig.addFilter("markdownify", (str) => {
    if (!str) return "";
    return md.render(str);
  });

  eleventyConfig.addFilter("slugify", (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });

  eleventyConfig.addFilter("smartify", (str) => {
    if (!str) return "";
    return String(str)
      .replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018")
      .replace(/'/g, "\u2019")
      .replace(/(^|[-\u2014/\[(\u2018\s])"/g, "$1\u201c")
      .replace(/"/g, "\u201d")
      .replace(/--/g, "\u2014");
  });

  eleventyConfig.addFilter("map", (arr, key) => {
    if (!arr) return [];
    return arr.map((item) => {
      if (item && item.data && item.data[key] !== undefined) return item.data[key];
      return item ? item[key] : undefined;
    });
  });

  eleventyConfig.addFilter("values", (obj) => {
    if (!obj) return [];
    if (Array.isArray(obj)) return obj;
    return Object.values(obj);
  });

  eleventyConfig.addFilter("absolute_url", function (url) {
    const siteData = this.ctx?.site || {};
    const base = (siteData.url || "") + (siteData.baseurl || "");
    if (!url) return base;
    if (url.startsWith("http")) return url;
    return base + url;
  });

  eleventyConfig.addFilter("where", (arr, key, value) => {
    if (!arr) return [];
    return arr.filter((item) => {
      const val = item.data ? item.data[key] : item[key];
      if (value === false) return val === false || val === undefined || val === null;
      if (value === true) return val === true;
      return val === value;
    });
  });

  eleventyConfig.addFilter("where_exp", (arr, itemName, expr) => {
    if (!arr) return [];
    // Support the common pattern: "item", "item.date >= site.time" or "item.date >= now"
    // This is a limited implementation for the patterns used in this site
    const isNow = (part) => part.includes("site.time") || part.includes("now");
    return arr.filter((item) => {
      if (expr.includes(">=")) {
        const parts = expr.split(">=").map((s) => s.trim());
        const field = parts[0].replace(itemName + ".", "");
        const itemVal = item.data ? item.data[field] : item[field];
        if (isNow(parts[1])) {
          return new Date(itemVal) >= new Date();
        }
      }
      if (expr.includes(">")) {
        const parts = expr.split(">").map((s) => s.trim());
        const field = parts[0].replace(itemName + ".", "");
        const itemVal = item.data ? item.data[field] : item[field];
        if (isNow(parts[1])) {
          return new Date(itemVal) > new Date();
        }
      }
      if (expr.includes("<")) {
        const parts = expr.split("<").map((s) => s.trim());
        const field = parts[0].replace(itemName + ".", "");
        const itemVal = item.data ? item.data[field] : item[field];
        if (isNow(parts[1])) {
          return new Date(itemVal) < new Date();
        }
      }
      if (expr.includes("!= true")) {
        const parts = expr.split("!=").map((s) => s.trim());
        const field = parts[0].replace(itemName + ".", "");
        const itemVal = item.data ? item.data[field] : item[field];
        return itemVal !== true;
      }
      return true;
    });
  });

  eleventyConfig.addFilter("sort", (arr, key, order) => {
    if (!arr) return [];
    const sorted = [...arr].sort((a, b) => {
      const aVal = a.data ? a.data[key] : a[key];
      const bVal = b.data ? b.data[key] : b[key];
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    });
    return sorted;
  });

  eleventyConfig.addFilter("sort_natural", (arr, key) => {
    if (!arr) return [];
    return [...arr].sort((a, b) => {
      const aVal = String(a.data ? a.data[key] : a[key]).toLowerCase();
      const bVal = String(b.data ? b.data[key] : b[key]).toLowerCase();
      return aVal.localeCompare(bVal);
    });
  });

  // --- Custom filters (replacing Ruby plugins) ---

  eleventyConfig.addFilter("startswith", (str, prefix) => {
    if (!str) return false;
    return String(str).startsWith(prefix);
  });

  eleventyConfig.addFilter("random_number", (max, lastNumber) => {
    const m = parseInt(max, 10);
    let n;
    do {
      n = Math.floor(Math.random() * m) + 1;
    } while (n === parseInt(lastNumber, 10) && m > 1);
    return n;
  });

  eleventyConfig.addFilter("is_even", (n) => parseInt(n, 10) % 2 === 0);

  eleventyConfig.addFilter("to_handle", (url) => {
    if (!url) return "";
    const parts = url.split("/");
    return `${parts[3]}@${parts[2]}`;
  });

  eleventyConfig.addFilter("liquify", function (input) {
    // The liquify filter is only used to expand {{ site.baseurl }} in feed content.
    // Rather than parsing Liquid at runtime, do a simple string replacement.
    if (!input) return "";
    const siteData = this.ctx?.site || {};
    return String(input)
      .replace(/\{\{\s*site\.baseurl\s*\}\}/g, siteData.baseurl || "")
      .replace(/\{\{\s*site\.url\s*\}\}/g, siteData.url || "");
  });

  // --- Collections ---

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByTag("posts")
      .filter((item) => !item.data.draft)
      .sort((a, b) => a.date - b.date)
  );

  eleventyConfig.addCollection("our_work", (collectionApi) =>
    collectionApi.getFilteredByTag("our_work")
  );

  eleventyConfig.addCollection("our_work_pageless", (collectionApi) =>
    collectionApi.getFilteredByTag("our_work_pageless")
  );

  eleventyConfig.addCollection("events", (collectionApi) =>
    collectionApi.getFilteredByTag("events")
  );

  eleventyConfig.addCollection("jobs", (collectionApi) =>
    collectionApi.getFilteredByTag("jobs")
  );

  eleventyConfig.addCollection("interviews", (collectionApi) =>
    collectionApi.getFilteredByTag("interviews")
  );

  eleventyConfig.addCollection("projects_active", (collectionApi) =>
    collectionApi
      .getFilteredByTag("our_work")
      .filter((item) => !item.data.retired)
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
  );

  eleventyConfig.addCollection("sketches_active", (collectionApi) =>
    collectionApi
      .getFilteredByTag("our_work_pageless")
      .filter((item) => !item.data.retired)
  );

  // Tag list for autopages (deduplicate by slug)
  eleventyConfig.addCollection("tagsList", (collectionApi) => {
    const slugify = (s) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/^-+|-+$/g, "");
    const tagMap = new Map();
    collectionApi.getFilteredByTag("posts").forEach((post) => {
      (post.data.tags || []).forEach((tag) => {
        if (tag === "posts") return;
        const slug = slugify(tag);
        if (!tagMap.has(slug)) {
          tagMap.set(slug, tag);
        }
      });
    });
    return [...tagMap.entries()].map(([slug, tag]) => ({
      name: tag,
      tagSlug: slug,
      posts: collectionApi.getFilteredByTag(tag).reverse(),
    }));
  });

  // Category list for autopages
  eleventyConfig.addCollection("categoriesList", (collectionApi) => {
    const slugify = (s) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/^-+|-+$/g, "");
    const catMap = new Map();
    collectionApi.getFilteredByTag("posts").forEach((post) => {
      (post.data.categories || []).forEach((cat) => {
        const slug = slugify(cat);
        if (!catMap.has(slug)) {
          catMap.set(slug, cat);
        }
      });
    });
    return [...catMap.entries()].map(([slug, cat]) => ({
      name: cat,
      catSlug: slug,
      posts: collectionApi
        .getFilteredByTag("posts")
        .filter((p) => (p.data.categories || []).includes(cat))
        .reverse(),
    }));
  });

  // --- Markdown ---
  eleventyConfig.setLibrary("md", md);

  // --- Dev server ---
  eleventyConfig.setServerOptions({
    showAllHosts: true,
  });

  // --- Watch targets ---
  eleventyConfig.addWatchTarget("app/assets/css/");

  return {
    dir: {
      input: "app",
      output: "build",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    templateFormats: [
      "html",
      "liquid",
      "md",
      "xml",
      "json",
      "webmanifest",
      "txt",
    ],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
  };
};
