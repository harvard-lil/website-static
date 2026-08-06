import fs from "node:fs";

import slugify from "@sindresorhus/slugify";
import { load } from "js-yaml";

const slugCache = new Map();

function slug(str) {
  let cached = slugCache.get(str);
  if (cached === undefined) {
    cached = slugify(str, { decamelize: false });
    slugCache.set(str, cached);
  }
  return cached;
}

export default function (eleventyConfig) {
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

  eleventyConfig.addCollection("research", (collectionApi) => {
    const additional = load(
      fs.readFileSync("app/_data/additional_research.yaml", "utf8")
    );
    return [
      ...collectionApi
        .getFilteredByTag("our_work")
        .filter((item) => item.data.category === "research" && !item.data.retired)
        .map((item) => ({ ...item.data, url: item.url })),
      ...additional,
    ];
  });

  eleventyConfig.addCollection("events", (collectionApi) =>
    collectionApi
      .getFilteredByTag("events")
      .filter((item) => item.inputPath.startsWith("./app/_events/"))
  );

  eleventyConfig.addCollection("jobs", (collectionApi) =>
    collectionApi
      .getFilteredByTag("jobs")
      .filter((item) => item.inputPath.startsWith("./app/_jobs/"))
  );

  eleventyConfig.addCollection("interviews", (collectionApi) =>
    collectionApi.getFilteredByTag("interviews")
  );

  eleventyConfig.addCollection("eventsSplit", (collectionApi) => {
    const now = new Date();
    const events = collectionApi
      .getFilteredByTag("events")
      .filter((item) => item.inputPath.startsWith("./app/_events/"))
      .sort((a, b) => a.date - b.date);
    return {
      next: events.find((e) => e.date >= now),
      upcoming: events.filter((e) => e.date > now).reverse(),
      past: events.filter((e) => e.date < now).reverse(),
    };
  });

  eleventyConfig.addCollection("tagsList", (collectionApi) => {
    const PAGE_SIZE = 12;
    const blogPosts = collectionApi.getFilteredByTag("posts");

    const tagMap = new Map();
    blogPosts.forEach((post) => {
      (post.data.tags || []).forEach((tag) => {
        if (tag === "posts") return;
        const tagSlug = slug(tag);
        let entry = tagMap.get(tagSlug);
        if (!entry) {
          entry = { name: tag, posts: [] };
          tagMap.set(tagSlug, entry);
        }
        if (entry.posts.at(-1) !== post) {
          entry.posts.push(post);
        }
      });
    });

    const pages = [];
    tagMap.forEach(({ name: tag, posts }, tagSlug) => {
      const tagPosts = [...posts].reverse();

      const totalPages = Math.max(1, Math.ceil(tagPosts.length / PAGE_SIZE));

      for (let i = 0; i < totalPages; i++) {
        const href = (n) =>
          n === 0
            ? `/blog/tag/${tagSlug}/`
            : `/blog/tag/${tagSlug}/page/${n + 1}/`;

        pages.push({
          name: tag,
          tagSlug,
          posts: tagPosts.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE),
          pageNumber: i,
          totalPages,
          totalPosts: tagPosts.length,
          href: {
            self: href(i),
            previous: i > 0 ? href(i - 1) : null,
            next: i < totalPages - 1 ? href(i + 1) : null,
          },
        });
      }
    });

    return pages;
  });

  eleventyConfig.addCollection("categoriesList", (collectionApi) => {
    const PAGE_SIZE = 12;
    const allPosts = collectionApi.getFilteredByTag("posts");

    const catMap = new Map();
    const postsByCategory = new Map();
    allPosts.forEach((post) => {
      (post.data.categories || []).forEach((cat) => {
        const catSlug = slug(cat);
        if (!catMap.has(catSlug)) {
          catMap.set(catSlug, cat);
        }
        let bucket = postsByCategory.get(cat);
        if (!bucket) {
          bucket = [];
          postsByCategory.set(cat, bucket);
        }
        if (bucket.at(-1) !== post) {
          bucket.push(post);
        }
      });
    });

    const pages = [];
    catMap.forEach((cat, catSlug) => {
      const catPosts = [...postsByCategory.get(cat)].reverse();

      const totalPages = Math.max(1, Math.ceil(catPosts.length / PAGE_SIZE));

      for (let i = 0; i < totalPages; i++) {
        const href = (n) =>
          n === 0
            ? `/blog/category/${catSlug}/`
            : `/blog/category/${catSlug}/page/${n + 1}/`;

        pages.push({
          name: cat,
          catSlug,
          posts: catPosts.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE),
          pageNumber: i,
          totalPages,
          totalPosts: catPosts.length,
          href: {
            self: href(i),
            previous: i > 0 ? href(i - 1) : null,
            next: i < totalPages - 1 ? href(i + 1) : null,
          },
        });
      }
    });

    return pages;
  });
}
