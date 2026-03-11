function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
        const slug = slugify(tag);
        if (!tagMap.has(slug)) {
          tagMap.set(slug, tag);
        }
      });
    });

    const pages = [];
    tagMap.forEach((tag, tagSlug) => {
      const tagPosts = blogPosts
        .filter((post) =>
          (post.data.tags || []).some((t) => slugify(t) === tagSlug)
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
}
