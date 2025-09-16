// 最常见的 12位置 + 居中
// 逻辑参考：https://ant.design/components/popover

// 两种定位模式：
//  1. anchor() + transform
//  2. position-area
// 然后 offset 用 transform 来实现

export type PhysicalPlacement
  = | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'left-top'
    | 'left-bottom'
    | 'right'
    | 'right-top'
    | 'right-bottom'
    | 'center'

export function toPositionArea(placement: PhysicalPlacement) {
  switch (placement) {
    case 'center':
      return 'center'

    case 'top':
      return 'top center'
    case 'top-left':
      return 'top span-right'
    case 'top-right':
      return 'top span-left'
    case 'bottom':
      return 'bottom center'
    case 'bottom-left':
      return 'bottom span-right'
    case 'bottom-right':
      return 'bottom span-left'

    case 'left':
      return 'center left'
    case 'left-top':
      return 'span-bottom left'
    case 'left-bottom':
      return 'span-top left'
    case 'right':
      return 'center right'
    case 'right-top':
      return 'span-bottom right'
    case 'right-bottom':
      return 'span-top right'
  }
}

export function toTransformOffset(x: number, y: number): string {
  return `translate(${x}px, ${y}px)`
}

export const COMMON_PLACEMENTS: PhysicalPlacement[] = [
  'top',
  'top-left',
  'top-right',
  'bottom',
  'bottom-left',
  'bottom-right',
  'left',
  'left-top',
  'left-bottom',
  'right',
  'right-top',
  'right-bottom',
  'center',
]

export interface Offset {
  x?: number
  y?: number
}

export interface PositionStyle {
  left: string
  top: string
  transform?: string
  [key: string]: string | undefined // 允许其他CSS属性
}

export function toPositionStyle(
  placement: PhysicalPlacement,
  offset: Offset = { x: 0, y: 0 },
  anchorName: string = 'target',
): PositionStyle {
  let left: string
  let top: string
  let transform: string = `translate(${offset.x}px, ${offset.y}px)`

  switch (placement) {
    case 'top':
      left = `anchor(${anchorName} center)`
      top = `anchor(${anchorName} top)`
      transform += `translateX(-50%) translateY(-100%)`
      break
    case 'top-left':
      left = `anchor(${anchorName} left)`
      top = `anchor(${anchorName} top)`
      transform += `translateY(-100%)`
      break
    case 'top-right':
      left = `anchor(${anchorName} right)`
      top = `anchor(${anchorName} top)`
      transform += ` translateX(-100%) translateY(-100%)`
      break
    case 'bottom':
      left = `anchor(${anchorName} center)`
      top = `anchor(${anchorName} bottom)`
      transform += ` translateX(-50%)`
      break
    case 'bottom-left':
      left = `anchor(${anchorName} left)`
      top = `anchor(${anchorName} bottom)`
      break
    case 'bottom-right':
      left = `anchor(${anchorName} right)`
      top = `anchor(${anchorName} bottom)`
      transform += ` translateX(-100%)`
      break
    case 'left':
      left = `anchor(${anchorName} left)`
      top = `anchor(${anchorName} center)`
      transform += ` translateX(-100%) translateY(-50%)`
      break
    case 'left-top':
      left = `anchor(${anchorName} left)`
      top = `anchor(${anchorName} top)`
      transform += ` translateX(-100%)`
      break
    case 'left-bottom':
      left = `anchor(${anchorName} left)`
      top = `anchor(${anchorName} bottom)`
      transform += ` translateX(-100%) translateY(-100%)`
      break
    case 'right':
      left = `anchor(${anchorName} right)`
      top = `anchor(${anchorName} center)`
      transform += ` translateY(-50%)`
      break
    case 'right-top':
      left = `anchor(${anchorName} right)`
      top = `anchor(${anchorName} top)`
      break
    case 'right-bottom':
      left = `anchor(${anchorName} right)`
      top = `anchor(${anchorName} bottom)`
      transform += ` translateY(-100%)`
      break
    case 'center':
      left = `anchor(${anchorName} center)`
      top = `anchor(${anchorName} center)`
      transform += ` translateX(-50%) translateY(-50%)`
      break
    default:
      // bottom
      left = `anchor(${anchorName} center)`
      top = `anchor(${anchorName} bottom)`
      transform += ` translateX(-50%)`
      break
  }

  return {
    left,
    top,
    transform,
  }
}
