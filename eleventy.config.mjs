export default function (eleventyConfig) {
  // Static passthrough: anything in src/public/ ships verbatim to /
  eleventyConfig.addPassthroughCopy({ "src/public": "/" });
  eleventyConfig.addPassthroughCopy("src/styles");

  // Cloudflare Pages config files live at site root, not under /styles or /public.
  // Source them from src/ root and copy to output root.
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  // Bill collection: only markdown files under src/bills/<jurisdiction>/*.md
  // (excludes bills/index.njk and any directory-level config).
  eleventyConfig.addCollection("bill", (collection) =>
    collection.getFilteredByGlob("src/bills/*/*.md").sort((a, b) => {
      const order = ["active", "passed-committee", "passed-chamber", "signed", "dead"];
      return order.indexOf(a.data.status) - order.indexOf(b.data.status);
    })
  );

  // Filter for human-friendly hearing dates: 2026-04-22 → "Wednesday, April 22, 2026"
  eleventyConfig.addFilter("longDate", (input) => {
    if (!input) return "";
    const d = input instanceof Date ? input : new Date(input + "T12:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  });

  // Filter for short hearing dates: 2026-04-22 → "Apr 22, 2026"
  eleventyConfig.addFilter("shortDate", (input) => {
    if (!input) return "";
    const d = input instanceof Date ? input : new Date(input + "T12:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  });

  // Status → human label
  eleventyConfig.addFilter("statusLabel", (status) => {
    return {
      active: "Active — needs your voice",
      "passed-committee": "Passed committee",
      "passed-chamber": "Passed chamber",
      signed: "Signed into law",
      dead: "Did not pass",
    }[status] || status;
  });

  // Status → banner CSS class (drives banner color)
  eleventyConfig.addFilter("statusClass", (status) => {
    return {
      active: "urgent",
      "passed-committee": "passed",
      "passed-chamber": "passed",
      signed: "signed",
      dead: "dead",
    }[status] || "neutral";
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
