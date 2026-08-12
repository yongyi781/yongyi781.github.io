import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import svelte from "@astrojs/svelte";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import tailwindcss from "@tailwindcss/vite";
import { unified, type RehypePlugin } from "@astrojs/markdown-remark";

// https://astro.build/config
export default defineConfig({
  site: "https://yongyi781.github.io",

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex as RehypePlugin],
    }),
  },

  integrations: [mdx(), sitemap(), svelte()],

  vite: {
    plugins: [tailwindcss()],
  },
});
