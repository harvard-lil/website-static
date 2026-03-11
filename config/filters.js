import markdownIt from "markdown-it";

export default function (eleventyConfig) {
  const md = markdownIt({ html: true, linkify: true, typographer: true });
  eleventyConfig.setLibrary("md", md);

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
    const siteUrl = this.ctx?.site?.url || "";
    if (!url) return siteUrl;
    if (url.startsWith("http")) return url;
    return siteUrl + url;
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
      const aVal = key == null ? a : (a.data ? a.data[key] : a[key]);
      const bVal = key == null ? b : (b.data ? b.data[key] : b[key]);
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
}
