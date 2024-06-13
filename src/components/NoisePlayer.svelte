<script lang="ts">
  import { onMount } from "svelte"

  function mean(ls: Float32Array) {
    return ls.reduce((prev, curr) => prev + curr, 0) / ls.length
  }

  function rmsArray(ls: Float32Array) {
    return Math.sqrt(mean(ls.map(x => x * x)))
  }

  function rms(audioBuffer: AudioBuffer) {
    return mean(
      new Float32Array(audioBuffer.numberOfChannels).fill(0).map((_, i) => rmsArray(audioBuffer.getChannelData(i)))
    )
  }

  async function loadAudioFile(ctx: AudioContext, path: RequestInfo | URL) {
    const response = await fetch(path)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
    return audioBuffer
  }

  function play() {
    if (ctx.state === "running") {
      playing = false
      ctx.suspend()
    } else {
      playing = true
      ctx.resume()
    }
  }

  const path = "/audio/restaurant_noise.mp3"
  const ctx = new AudioContext()
  const gain = ctx.createGain()
  const source = ctx.createBufferSource()
  let audioBuffer: AudioBuffer
  let baseVolume = -30
  let playing = $state(false)
  let volume = $state(-30)
  $effect(() => {
    gain.gain.value = 10 ** ((volume - baseVolume) / 20)
  })

  onMount(async () => {
    ctx.suspend()
    gain.connect(ctx.destination)
    audioBuffer = await loadAudioFile(ctx, path)
    source.buffer = audioBuffer
    source.loop = true
    source.connect(gain)
    source.start()
    baseVolume = volume = 20 * Math.log10(rms(audioBuffer))
  })
</script>

<div class="flex flex-col text-center min-w-[700px]">
  <h1 class="text-4xl font-bold mb-8">Restaurant noise simulator</h1>
  <button class="bg-blue-500 hover:enabled:bg-blue-700 text-white px-4 py-2 rounded" onclick={play}
    >{playing ? "Stop" : "Play"}</button>
  <div class="text-xl mt-8">{volume.toFixed(1)} dB</div>
  <input class="" type="range" min="-80" max="0" step="0.1" bind:value={volume} />
</div>
