// 返回一个 引用稳定但逻辑始终最新 的回调函数
// 避免在 useEffect、事件监听或异步回调里遇到闭包捕获旧 state 的问题
// 场景：注册原生事件、定时器、Promise 回调

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

const useIsomorphicLayoutEffect
  = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function useEventCallback<T extends (...args: any[]) => any>(fn: T) {
  const ref = useRef<T>(fn)

  useIsomorphicLayoutEffect(() => {
    ref.current = fn
  }, [fn])

  return useCallback((...args: any[]) => ref.current(...args), []) as T
}
