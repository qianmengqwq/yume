import type { SyntheticEvent } from 'react'

export function stopPropagation(event: SyntheticEvent) {
  event.stopPropagation()
}

export function preventDefault(event: SyntheticEvent) {
  event.preventDefault()
}
