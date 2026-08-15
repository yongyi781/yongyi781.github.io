import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

import svelte from "@astrojs/svelte"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

import tailwindcss from "@tailwindcss/vite"
import { unified, type RehypePlugin } from "@astrojs/markdown-remark"
import { viteStaticCopy } from "vite-plugin-static-copy"

// https://astro.build/config
export default defineConfig({
  site: "https://yongyi781.github.io",

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex as RehypePlugin]
    })
  },

  integrations: [mdx(), sitemap(), svelte()],

  vite: {
    plugins: [
      tailwindcss(),
      viteStaticCopy({
        targets: [
          {
            src: "node_modules/temml/dist/temml.min.js",
            dest: "temml",
            rename: { stripBase: true }
          },
          {
            src: "node_modules/temml/dist/Temml-Latin-Modern.css",
            dest: "temml",
            rename: { stripBase: true }
          },
          {
            src: "node_modules/temml/dist/Temml.woff2",
            dest: "temml",
            rename: { stripBase: true }
          }
        ]
      })
    ]
  }
})
