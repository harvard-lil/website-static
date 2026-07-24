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

  eleventyConfig.addFilter("map", (arr, key) => {
    if (!arr) return [];
    return arr.map((item) => {
      if (item && item.data && item.data[key] !== undefined)
        return item.data[key];
      return item ? item[key] : undefined;
    });
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

  eleventyConfig.addFilter("where", (arr, key, value) => {
    if (!arr) return [];
    return arr.filter((item) => {
      const val = item.data ? item.data[key] : item[key];
      if (value === false)
        return val === false || val === undefined || val === null;
      if (value === true) return val === true;
      return val === value;
    });
  });

  eleventyConfig.addFilter("where_exp", (arr, itemName, expr) => {
    if (!arr) return [];
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
    return [...arr].sort((a, b) => {
      const aVal = key == null ? a : a.data ? a.data[key] : a[key];
      const bVal = key == null ? b : b.data ? b.data[key] : b[key];
      const aNil = aVal == null || aVal === "";
      const bNil = bVal == null || bVal === "";
      if (aNil && bNil) return 0;
      if (aNil) return -1;
      if (bNil) return 1;
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    });
  });

  eleventyConfig.addFilter("sort_natural", (arr, key) => {
    if (!arr) return [];
    return [...arr].sort((a, b) => {
      const aVal = String(a.data ? a.data[key] : a[key]).toLowerCase();
      const bVal = String(b.data ? b.data[key] : b[key]).toLowerCase();
      return aVal.localeCompare(bVal);
    });
  });

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
