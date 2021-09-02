export function makeTranslation(element: HTMLElement) {
  let _rAFLock = false

  return {
    translate({
      y,
      smooth,
      force,
      onAnimationFrame,
    }: {
      y: number
      smooth?: boolean
      force?: boolean
      onAnimationFrame?: (Δy: number) => void
    }) {
      if (force || !_rAFLock) {
        _rAFLock = true
        requestAnimationFrame(() => {
          if (y === 0) {
            element.style.transform = ''
            element.style.overflow = ''
            element.style.transition = ''
          } else {
            element.style.transform = `translateY(${y}px)`
            element.style.overflow = 'hidden'

            if (smooth) {
              element.style.transition = ''
            } else {
              element.style.transition = '0s'
            }
          }

          onAnimationFrame?.(y)
          _rAFLock = false
        })
      }
    },
    resetTranslation: () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          element.style.transform = ''
          element.style.transition = ''
          element.style.overflow = ''
          resolve()
        })
      }),
  }
}
