import { readFileSync } from "node:fs";
import { load } from "js-yaml";

// Server-side redirects that are not built from this repo
const SERVER_SIDE_REDIRECTS = ["/data-gov-archive", "/lawskills-hub"];

function isServerSideRedirect(path) {
  return SERVER_SIDE_REDIRECTS.some(
    (prefix) => path.startsWith(prefix) && /^(?:[/?#]|$)/.test(path.slice(prefix.length)),
  );
}

export default function (eleventyConfig) {
  const { hostname } = new URL(load(readFileSync("app/_data/site.yaml", "utf8")).url);
  const escapedHostname = hostname.replace(/^www\./, "").replaceAll(".", "\\.");
  const selfUrl = new RegExp(`^(?:https?:)?//(?:www\\.)?${escapedHostname}(?=[/?#]|$)`, "i");

  eleventyConfig.htmlTransformer.addUrlTransform("html", (url, { tag }) => {
    if (tag === "link" || !selfUrl.test(url)) return url;
    const path = url.replace(selfUrl, "") || "/";
    if (isServerSideRedirect(path)) return url;
    return path.startsWith("/") ? path : `/${path}`;
  });
}
