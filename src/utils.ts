export function delay(delayInms: number) {
  return new Promise(resolve => setTimeout(resolve, delayInms))
}

/** Inclusive */
export function randInt(low: number, high: number) {
  return low + Math.floor((high - low + 1) * Math.random())
}

export function randomChoice<T>(arr: T[]) {
  return arr[randInt(0, arr.length - 1)]
}

export function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = src

    document.body.appendChild(script)

    script.addEventListener("load", () => resolve(script))
    script.addEventListener("error", () => reject(script))
  })
}

export function loadStylesheet(href: string, uniqueId?: string) {
  if (uniqueId) {
    let existing = document.getElementById(uniqueId)
    if (existing) existing.remove()
  }
  return new Promise((resolve, reject) => {
    const link = document.createElement("link")
    if (uniqueId) link.id = uniqueId
    link.rel = "stylesheet"
    link.href = href

    document.head.appendChild(link)

    link.addEventListener("load", () => resolve(link))
    link.addEventListener("error", () => reject(link))
  })
}

export function isSquare(n: number) {
  return n >= 0 && Number.isInteger(Math.sqrt(n))
}
