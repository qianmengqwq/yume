import type { MouseEvent as ReactMouseEvent, RefObject } from 'react'
import { useCallback } from 'react'

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick?: () => void,
  onClick?: (event: ReactMouseEvent<T>) => void,
) {
  return useCallback(
    (event: ReactMouseEvent<T>) => {
      onClick?.(event)
      if (!onOutsideClick)
        return

      const el = ref.current
      if (!el)
        return

      const rect = el.getBoundingClientRect()
      const clickedInBounds
        = event.clientX >= rect.left
          && event.clientX <= rect.right
          && event.clientY >= rect.top
          && event.clientY <= rect.bottom

      if (!clickedInBounds)
        onOutsideClick()
    },
    [ref, onClick, onOutsideClick],
  )
}
