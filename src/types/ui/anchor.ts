export type PhysicalPlacement
  = | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'center'

export function toPositionArea(placement: PhysicalPlacement) {
  switch (placement) {
    case 'center':
      return 'center'

    case 'top':
      return 'top center'
    case 'top-start':
      return 'top inline-start'
    case 'top-end':
      return 'top inline-end'
    case 'bottom':
      return 'bottom center'
    case 'bottom-start':
      return 'bottom inline-start'
    case 'bottom-end':
      return 'bottom inline-end'

    case 'left':
      return 'center left'
    case 'left-start':
      return 'block-start left'
    case 'left-end':
      return 'block-end left'
    case 'right':
      return 'center right'
    case 'right-start':
      return 'block-start right'
    case 'right-end':
      return 'block-end right'
  }
}

export const COMMON_PLACEMENTS: PhysicalPlacement[] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
  'center',
]
