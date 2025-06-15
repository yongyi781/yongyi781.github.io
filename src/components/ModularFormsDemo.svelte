<script lang="ts">
  import { onMount } from "svelte"
  import { fromCoeffs, modularForms } from "../ModularForm.ts"
  import CindyCanvas from "./CindyCanvas.svelte"
  import Switch from "./Switch.svelte"

  type Matrix = [[number, number], [number, number]]

  function copy(mat?: Matrix): Matrix | undefined {
    if (mat) {
      let [[a, b], [c, d]] = mat
      return [
        [a, b],
        [c, d]
      ]
    }
  }

  function mul(m1: Matrix, m2: Matrix): Matrix {
    let [[a, b], [c, d]] = m1
    let [[e, f], [g, h]] = m2
    return [
      [a * e + b * g, a * f + b * h],
      [c * e + d * g, c * f + d * h]
    ]
  }

  function cindyEval(str: string, printOutput = false) {
    let output = cindyCanvas?.csEval(str)
    if (printOutput && output) csOutput = output
  }

  function handleChange(resetParams = false, force = false) {
    if (resetParams) {
      if (selectedMF.params)
        for (let i = 0; i < selectedMF.params.length; i++) params[i] = selectedMF.params[i].default ?? 0
      transform = false
      level = selectedMF.level
      weight = selectedMF.weight
      rot = selectedMF.rot ?? 1
      transform = true
      transform = false
    }
    if (force) csText = ""
    if (selectedMF.getFunction) {
      csText = `f(tau) := ${selectedMF.getFunction(params)}`
    } else if (selectedMF.coefficients) {
      csText = `f(tau) := ${fromCoeffs(selectedMF.coefficients)}`
    }
    if (!selectedMF.coefficients) {
      listen = false
      handleListenChange()
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement && e.target.type === "text") return
    switch (e.key) {
      case "h":
        upperHalfPlane = !upperHalfPlane
        e.preventDefault()
        break
      case " ":
        transform = !transform
        e.preventDefault()
        break
      case "t":
      case "T":
        mat = mul(mat, [
          [1, e.shiftKey ? -1 : 1],
          [0, 1]
        ])
        transform = true
        break
      case "r":
      case "R":
        mat = mul(mat, [
          [1, 0],
          [e.shiftKey ? 1 : -1, 1]
        ])
        transform = true
        break
      case "s":
      case "S":
        mat = mul(mat, [
          [0, e.shiftKey ? 1 : -1],
          [e.shiftKey ? -1 : 1, 0]
        ])
        transform = true
        break
      case "w":
      case "W":
        mat = mul(
          [
            [1, e.shiftKey ? -1 : 1],
            [0, 1]
          ],
          mat
        )
        transform = true
        break
      case "q":
      case "Q":
        mat = mul(
          [
            [1, 0],
            [e.shiftKey ? 1 : -1, 1]
          ],
          mat
        )
        transform = true
        break
      case "f": // Fricke involution
        mat = [
          [0, -1],
          [level, 0]
        ]
        transform = true
        break
      case "i":
        mat = [
          [1, 0],
          [0, 1]
        ]
        transform = true
        break
      case "ArrowUp":
        if (e.ctrlKey) {
          selectedModularFormIndex = Math.max(0, Math.min(modularForms.length - 1, selectedModularFormIndex - 1))
          e.preventDefault()
        }
        break
      case "ArrowDown":
        if (e.ctrlKey) {
          selectedModularFormIndex = Math.max(0, Math.min(modularForms.length - 1, selectedModularFormIndex + 1))
          e.preventDefault()
        }
        break
    }
  }

  function handleListenChange() {
    if (listen && selectedMF.coefficients) {
      if (!ac) ac = new AudioContext()
      osc = ac.createOscillator()
      let gain = ac.createGain()
      gain.gain.value = 0.05
      gain.connect(ac.destination)
      osc.connect(gain)
      updatePeriodicWave(listenY)
      osc.start()
    } else if (osc) {
      osc.stop()
      osc.disconnect()
      osc = null
    }
  }

  function updatePeriodicWave(listenY: number) {
    if (osc && selectedMF.coefficients) {
      let wave = ac.createPeriodicWave(
        selectedMF.coefficients.map((x, n) => x * Math.exp(-2 * Math.PI * n * listenY)),
        Array(selectedMF.coefficients.length).fill(0)
      )
      osc.frequency.value = listenFreq * (selectedMF.fourierScale ?? 1)
      osc.setPeriodicWave(wave)
    }
  }

  let cindy: any = $state()
  let cindyCanvas: CindyCanvas
  let select: HTMLSelectElement
  let csText = $state("")
  let csOutput = $state("")
  let numTerms = $state(15)
  let upperHalfPlane = $state(false)
  let transform = $state(false)
  let brightnessScale = $state(7)
  let level = $state(1)
  let weight = $state(0)
  let rot = $state(1)
  let params = Array(50).fill(0)
  let listen = $state(false)
  let listenY = $state(0)
  let listenFreq = $state(174)
  let ac: AudioContext
  let osc: OscillatorNode | null
  let mat: Matrix = $state([
    [0, -1],
    [1, 0]
  ])
  let selectedModularFormIndex = $state(0)

  let selectedMF = $derived(modularForms[selectedModularFormIndex])
  $effect(() => {
    if (selectedMF) handleChange(true)
  })

  $effect(() => {
    cindyEval(csText, true)
  })

  $effect(() => {
    cindyEval(
      `upperHalfPlane = ${upperHalfPlane}; transform = ${transform}; level = ${level}; weight = ${weight}; rot = ${rot}; brightnessScale = ${brightnessScale}; numTerms = ${numTerms}; mat = [[${mat[0][0]},${mat[0][1]}],[${mat[1][0]},${mat[1][1]}]]`
    )
  })

  $effect(() => updatePeriodicWave(listenY))

  onMount(() => {
    setInterval(() => {
      if (listen) {
        listenY += 0.005
        if (listenY > 0.5) listenY = 0
      }
    }, 17)
    return () => {
      if (osc) {
        osc.stop()
        osc.disconnect()
      }
    }
  })
</script>

<svelte:document on:keydown={handleKeyDown} />

<div id="cindyScripts">
  <script id="csinit" type="text/x-cindyscript">
    hslToRgb(h, s, l) := (
      regional(hh,c,x,m);
      l = min(0.999,max(0,l));
      hh = min(360,max(0,h * 180 / pi));
      c = (1 - |2*l - 1|) * s;
      x = c * (1 - abs(mod(hh / 60, 2) - 1));
      m = l - c / 2;
      (m, m, m) + if(hh < 60, (c, x, 0), if(hh < 120, (x, c, 0), if(hh<180, (0, c, x), if (hh<240, (0, x, c), if(hh < 300, (x, 0, c), (c, 0, x))))));
    );
    eta(tau) := (regional(res); res = 0; repeat(numTerms, (
      regional(a,b);
      a = floor(# / 2);
      b = -1 + 3*mod(#,4) - mod(#,2) + 12*floor(# / 4);
      res = res + (-1)^(floor(#/2)) * exp(b^2*pi*i*tau/12);
    )); res);
    theta1(tau) := 0;
    theta2(tau) := (regional(res); res = 0; repeat(numTerms, res = res + 2*exp((#-1/2)^2*pi*i*tau)); res);
    theta3(tau) := (regional(res); res = 1; repeat(numTerms - 1, res = res + 2*exp(#^2*pi*i*tau)); res);
    theta4(tau) := (regional(res); res = 1; repeat(numTerms - 1, res = res + (-1)^#*2*exp(#^2*pi*i*tau)); res);
    theta(tau) := theta3(tau);
    E2(tau) := (regional(res); res = -1/24; repeat(numTerms - 1, res = res + #*exp(2*#*pi*i*tau)/(1-exp(2*#*pi*i*tau))); res);
    E2nonhol(tau) := E2(tau) + 1/(8*pi*im(tau));
    E4(tau) := 1/480*(theta2(tau)^8 + theta3(tau)^8 + theta4(tau)^8);
    E6(tau) := -1/504 * (((theta2(2*tau))^4)^3-33*(((theta2(2*tau))^4)+((theta3(2*tau))^4))*((theta2(2*tau))^4)*((theta3(2*tau))^4)+((theta3(2*tau))^4)^3);
    E8(tau) := 1/960*(theta2(tau)^16 + theta3(tau)^16 + theta4(tau)^16);
    fromCoeffs(tau) := (regional(res); res = 0; repeat(min(numTerms,length(coeffs)), res = res + coeffs_(#) * exp(2*(#-1)*pi*i*tau)); res);
    fromScreen(z) := if(upperHalfPlane, z + halfPlaneOffset*i, i * (1 + z/diskScale) / (1 - z/diskScale));
    // Works for larger numbers than abs(...).
    realAbs(x) := if(x<0,-x,x);
    realToTex(r) := (
      regional(s, ie, iplus);
      s = guess(r);
      ie = indexof(s, "e");
      iplus = if(s_(ie+1)=="+",ie+1,ie);
      if(isundefined(s),"\tilde{\infty}",
      if(ie>0,substring(s,0,ie-1)+"\cdot 10^{"+substring(s,iplus,length(s))+"}",s))
    );
    complexToTex(z) := (
      regional(realStr,imStr,imPlus);
      realStr = realToTex(re(z));
      imStr = realToTex(realAbs(im(z)));
      imPlus = if(or(realStr=="0",realStr=="-0"),"","+");
      if(and(and(or(realStr=="0",realStr=="-0"),imStr!="0"),imStr!="-0"),"",realStr) + if(or(imStr=="0",imStr=="-0"),"",if(im(z)>0,imPlus,"-") + if(imStr=="1","",imStr + " ") + "i")
    );

    f(tau) := tau;
    f3(g) := (
      regional(tau,a,b,c,d);
      a = g_1_1;
      b = g_1_2;
      c = g_2_1;
      d = g_2_2;
      tau = (a*i + b) / (c*i + d);
      det(g)^(weight/2) * (c*i+d)^(-weight) * i^(rot*weight*if(transform,1,0)) * f(tau);
    );
    f2(tau) := (
      regional(s, nn, aa, kk);
      s = re(sqrt(im(tau)));
      nn = [[1, re(tau)], [0, 1]];
      aa = [[s, 0], [0, 1/s]];
      kk = [[K.x, -K.y], [K.y, K.x]];
      if(transform,f3(mat*nn*aa*kk),f3(nn*aa*kk))
    );
    resetclock();
    scale = 15;
    transform = false;
    upperHalfPlane = false;
    halfPlaneOffset = 2;
    brightnessScale = 7;
    diskScale = 2.8;
    weight = 0;
    level = 1;
    mat = [[0,-1],[1,0]];
    rot = 0;
    numTerms = 15;
    coeffs = [1];
  </script>
  <script id="csdraw" type="text/x-cindyscript">
    colorplot((
      regional(tau, result);
      tau = fromScreen(z);
      if(im(tau)<0,grey(0.1),
        result = f2(tau);
        h = mod(im(log(result)) + 2 * pi, 2 * pi);
        l = 1 / (1 + exp(-re(log(result)) / brightnessScale));
        hslToRgb(h, 0.8, l);
      ))
    );
    if(upperHalfPlane, (
      apply(-5..5, drawText((#,-halfPlaneOffset - 0.2), #, color->grey(0.9), size->12, align->"mid", family->"Segoe UI"));
      ), (
      apply(-5..5, (
        drawText((diskScale + 0.1) * (re((# - i) / (# + i)), im((# - i) / (# + i))), #, color->grey(0.9), size->12, align->"mid", family->"Segoe UI")
      ));
      drawText((diskScale + 0.1) * (1,0), "$\infty$", color->grey(0.9), size->12, align->"mid", family->"Segoe UI");
    ));
    tauMouse = fromScreen(complex(mouse()));
    textLoc = screenbounds()_4_[1,2];
    textLoc2 = screenbounds()_3_[1,2];
    if(im(tauMouse)>=0,(
      drawText(textLoc + (0.1,0.4), "$\tau="+complexToTex(tauMouse),color->grey(0.7), size->18);
      drawText(textLoc + (0.1,0.1), "$f(\tau)=" + complexToTex(f2(tauMouse)), color->grey(0.7), size->18)
    ));
    drawText(textLoc2 + (-0.1,0.1), "$f(\infty i)=" + complexToTex(f2(100*i)/10^weight), color->grey(0.7), size->18, align->"right");
  </script>
</div>
<div>
  <div class="bg-indigo-300/20 p-2 shadow-md flex flex-wrap gap-2">
    <label>
      Modular form:
      <select bind:value={selectedModularFormIndex} bind:this={select}>
        {#each modularForms as modularForm, i}
          <option value={i}>{modularForm.name}</option>
        {/each}
      </select>
    </label>
    <label
      >Terms: <input type="number" min="1" max="100" class="w-20" autocomplete="off" bind:value={numTerms} /></label>
    <label>Level: <input type="number" min="1" max="100" class="w-20" autocomplete="off" bind:value={level} /></label>
    <label
      >Weight: <input
        type="number"
        min="-100"
        max="100"
        step="0.5"
        class="w-20"
        autocomplete="off"
        bind:value={weight} /></label>
    {#each modularForms[selectedModularFormIndex].params ?? [] as param, i}
      <label
        >{@html param.name}:
        <input
          type="number"
          class="w-14"
          min={param.min ?? -100}
          max={param.max ?? 100}
          step={param.step ?? 1}
          autocomplete="off"
          bind:value={params[i]}
          onchange={() => {
            handleChange()
          }} /></label>
    {/each}
  </div>
  <div class="flex gap-2">
    <div class="flex flex-col bg-indigo-300/20 p-2 my-2 shadow-md w-[250px]">
      <div class="grid grid-cols-[1fr_60px]">
        Upper half plane <Switch bind:checked={upperHalfPlane} />
        Transform <Switch bind:checked={transform} />
        <span>Rotation</span><input type="number" min="0" max="12" autocomplete="off" bind:value={rot} />
        <span>Brightness scale</span><input
          type="number"
          min="1"
          max="20"
          autocomplete="off"
          bind:value={brightnessScale} />
        {#if selectedMF.coefficients}
          Listen <Switch bind:checked={listen} on:change={handleListenChange} />
          <input type="range" class="col-span-2" min="20" max="2000" step="0.001" bind:value={listenFreq} />
        {/if}
      </div>
      Matrix
      <div class="border border-indigo-300 bg-red-500/20 px-2 py-1 my-1 text-center self-center">
        <div class="grid grid-cols-2 w-auto">
          {#each Array(2) as _, i}
            {#each Array(2) as _, j}
              <input type="number" class="w-[60px]" autocomplete="off" bind:value={mat[i][j]} />
            {/each}
          {/each}
        </div>
        det = {mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]}
      </div>
      <div class="text-center">
        <button
          onclick={() =>
            (mat = copy(selectedMF.mat) ?? [
              [0, -1],
              [1, 0]
            ])}>Default</button>
        <button
          onclick={() =>
            (mat = [
              [1, 0],
              [0, 1]
            ])}>Id</button>
      </div>
    </div>
    <CindyCanvas
      bind:cindy
      bind:this={cindyCanvas}
      class="w-full h-[600px] self-center"
      geometry={[
        {
          name: "O",
          type: "Free",
          pos: [0.0, -0.0, 4.0],
          color: [1.0, 0.0, 0.0],
          pinned: true,
          visible: false,
          labeled: false
        },
        {
          name: "C0",
          type: "CircleByFixedRadius",
          color: [0.0, 0.0, 1.0],
          radius: 2.0,
          args: ["O"],
          printname: "$C_{0}$"
        },
        { name: "K", type: "PointOnCircle", pos: [4.0, -0.0, 4.0], color: [1.0, 0.0, 0.0], args: ["C0"], labeled: true }
      ]}
      visibleRect={[-5.3, -5, 5.3, 5]}
      use={["katex", "CindyGL"]}
      on:load={() => handleChange(true, true)}></CindyCanvas>
  </div>
  <div class="flex flex-col gap-2 bg-indigo-300/20 p-2 mt- shadow-md">
    <label class="flex gap-2 items-center">
      CindyScript: <input class="w-full font-mono text-sm" autocomplete="off" bind:value={csText} />
    </label>
    <textarea class="w-full h-32 font-mono text-sm" readonly bind:value={csOutput}></textarea>
  </div>
  <div class="flex flex-col gap-2 bg-indigo-300/20 p-2 mt-2 shadow-md">
    <h2 class="font-medium text-xl">Legend</h2>
    <ul>
      <li><kbd>H</kbd>: toggle upper half plane</li>
      <li><kbd>Space</kbd>: toggle transform</li>
      <li><kbd>T</kbd>: &tau; &mapsto; &tau; + 1 (Shift+T to perform inverse)</li>
      <li><kbd>R</kbd>: &tau; &mapsto; &tau;/(1 - &tau;) (Shift+R to perform inverse)</li>
      <li><kbd>S</kbd>: &tau; &mapsto; &minus;1/&tau;</li>
      <li><kbd>W</kbd>: &tau; &mapsto; &tau; + 1 left action</li>
      <li><kbd>Q</kbd>: &tau; &mapsto; &tau;/(&tau; + 1) left action</li>
      <li><kbd>F</kbd>: Fricke involution</li>
      <li><kbd>I</kbd>: Reset to identity</li>
    </ul>
  </div>
</div>
