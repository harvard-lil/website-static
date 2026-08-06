import markdownIt from "markdown-it";

function rawHtmlTypographer(md) {
  const MARKUP_RE = /(<!--[\s\S]*?-->|<[^>]*>)/;
  const VERBATIM_TAG_RE = /^<\s*(\/?)(pre|code|script|style|textarea)\b/i;

  md.core.ruler.before("replacements", "raw_html_typographer_open", (state) => {
    if (!state.md.options.typographer) return;
    let verbatimDepth = 0;

    for (const token of state.tokens) {
      if (token.type !== "html_block") continue;
      const children = [];

      token.content.split(MARKUP_RE).forEach((segment, i) => {
        if (segment === "") return;
        const isMarkup = i % 2 === 1;
        if (isMarkup) {
          const verbatim = segment.match(VERBATIM_TAG_RE);
          if (verbatim) {
            verbatimDepth = Math.max(0, verbatimDepth + (verbatim[1] ? -1 : 1));
          }
        }
        const child = new state.Token(
          isMarkup || verbatimDepth > 0 ? "html_inline" : "text",
          "",
          0,
        );
        child.content = segment;
        children.push(child);
      });
      token.type = "inline";
      token.children = children;
      token.meta = { ...token.meta, rawHtmlTypographer: true };
    }
  });

  md.core.ruler.push("raw_html_typographer_close", (state) => {
    for (const token of state.tokens) {
      if (!token.meta?.rawHtmlTypographer) continue;
      token.type = "html_block";
      token.content = token.children.map((t) => t.content).join("");
      token.children = null;
      delete token.meta.rawHtmlTypographer;
    }
  });
}

export default function (eleventyConfig) {
  const md = markdownIt({ html: true, linkify: true, typographer: true });
  md.linkify.set({ fuzzyLink: false });
  rawHtmlTypographer(md);
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("markdownify", (str) => {
    if (!str) return "";
    return md.render(str);
  });

  eleventyConfig.addFilter("markdownify_inline", (str) => {
    if (!str) return "";
    return md.renderInline(str);
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

  eleventyConfig.addFilter("values", (obj) => {
    if (!obj) return [];
    if (Array.isArray(obj)) return obj;
    return Object.values(obj);
  });

  eleventyConfig.addFilter("absolute_url", function (url) {
    const siteUrl = this.ctx?.site?.url || "";
    if (!url) return siteUrl;
    if (url.startsWith("http")) return url;
    return siteUrl + url;
  });

  eleventyConfig.addFilter("startswith", (str, prefix) => {
    if (!str) return false;
    return String(str).startsWith(prefix);
  });

  eleventyConfig.addFilter("hashed_number", (max, seed, lastNumber) => {
    const m = parseInt(max, 10);
    if (!(m > 0)) return 1;

    let hash = 0x811c9dc5;
    for (const char of String(seed ?? "")) {
      hash ^= char.codePointAt(0);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }

    const n = (hash % m) + 1;

    // Don't repeat the last number
    return n === parseInt(lastNumber, 10) && m > 1 ? (n % m) + 1 : n;
  });

  eleventyConfig.addFilter("is_even", (n) => parseInt(n, 10) % 2 === 0);

  eleventyConfig.addFilter("to_handle", (url) => {
    if (!url) return "";
    const parts = url.split("/");
    return `${parts[3]}@${parts[2]}`;
  });

  eleventyConfig.addFilter("liquify", function (input) {
    if (!input) return "";
    const siteUrl = this.ctx?.site?.url || "";
    return String(input).replace(/\{\{\s*site\.url\s*\}\}/g, siteUrl);
  });

  eleventyConfig.addFilter("post_excerpt", function (post) {
    if (post.data?.excerpt) return post.data.excerpt;
    const content = post.templateContent || "";
    if (content.includes("<!--more-->")) {
      return content.split("<!--more-->")[0].trim();
    }
    const match = content.match(/<p[^>]*>[\s\S]*?<\/p>/i);
    return match ? match[0] : "";
  });
}
