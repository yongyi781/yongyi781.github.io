<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte"
  import { loadScript, loadStylesheet } from "../utils"

  export let cindy: any = null
  let className = ""
  export { className as class }
  export let geometry: any[] = []
  export let visibleRect = [-1, -1, 1, 1]
  export let axes = false
  export let use: string[] = []

  const dispatch = createEventDispatcher()
  let csCanvas: HTMLDivElement

  export function csEval(str: string) {
    return JSON.stringify(cindy?.evalcs(str), undefined, 2)
  }

  async function startCindy() {
    if (!window.CindyJS) {
      await loadScript("https://cindyjs.org/dist/latest/Cindy.js")
      await loadScript("https://cindyjs.org/dist/latest/CindyGL.js")
    }
    // await loadStylesheet("https://cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css", "latestKatex") // Hack :/
    cindy = window.CindyJS.newInstance({
      scripts: "cs*",
      angleUnit: "°",
      exclusive: false,
      geometry,
      ports: [
        {
          element: csCanvas,
          transform: [{ visibleRect }],
          axes,
          grid: 1.0
        }
      ],
      csconsole: false,
      autoplay: true,
      use
    })
    await cindy.startup()
    dispatch("load")
  }

  onMount(() => {
    startCindy()
    return async () => {
      document.querySelector("div.CindyJS-widget")?.remove()
    }
  })
</script>

<div class={className} bind:this={csCanvas}></div>
