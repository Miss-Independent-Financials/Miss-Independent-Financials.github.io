import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import MarkdownIt from "markdown-it";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addGlobalData('site_title', 'Miss Independent Financials');
  eleventyConfig.setIncludesDirectory('_includes');
  eleventyConfig.setLayoutsDirectory('_layouts');
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addFilter('markdown', v => MarkdownIt().render(v));
};
