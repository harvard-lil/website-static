import fs from "node:fs";

import slugify from "@sindresorhus/slugify";
import yaml from "js-yaml";

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
    const additional = yaml.load(
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

  eleventyConfig.addCollection("tagsList", (collectionApi) => {
    const PAGE_SIZE = 12;
    const blogPosts = collectionApi.getFilteredByTag("posts");
    const tagMap = new Map();
    blogPosts.forEach((post) => {
      (post.data.tags || []).forEach((tag) => {
        if (tag === "posts") return;
        const slug = slugify(tag, { decamelize: false });
        if (!tagMap.has(slug)) {
          tagMap.set(slug, tag);
        }
      });
    });

    const pages = [];
    tagMap.forEach((tag, tagSlug) => {
      const tagPosts = blogPosts
        .filter((post) =>
          (post.data.tags || []).some((t) => slugify(t, { decamelize: false }) === tagSlug)
        )
        .reverse();

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
    allPosts.forEach((post) => {
      (post.data.categories || []).forEach((cat) => {
        const slug = slugify(cat, { decamelize: false });
        if (!catMap.has(slug)) {
          catMap.set(slug, cat);
        }
      });
    });

    const pages = [];
    catMap.forEach((cat, catSlug) => {
      const catPosts = allPosts
        .filter((p) => (p.data.categories || []).includes(cat))
        .reverse();

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
