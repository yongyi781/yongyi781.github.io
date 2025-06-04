import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

import svelte from "@astrojs/svelte"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  site: "https://yongyi781.github.io",

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  },

  integrations: [mdx(), sitemap(), svelte()],

  vite: {
    plugins: [tailwindcss()]
  }
})
