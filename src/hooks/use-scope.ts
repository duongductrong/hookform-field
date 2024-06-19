import { useCallback, useSyncExternalStore } from "react"

export const createScope = <TState>(initialState: TState) => {
  let state: TState = initialState
  const listeners = new Set<any>([])

  const getState = (): TState => state

  const setState = (fn: (state: TState) => TState) => {
    state = fn(state)
    listeners.forEach((listener) => listener?.())
  }

  const subscribe = (fn: any) => {
    listeners.add(fn)

    return () => {
      listeners.delete(fn)
    }
  }

  return {
    getState,
    setState,
    subscribe,
  }
}

export const useScope = <TState, TResult>(
  scope: ReturnType<typeof createScope<TState>>,
  selector: (state: TState) => TResult
) => {
  const selectorFn = useCallback(() => selector(scope.getState()), [])
  return useSyncExternalStore(scope.subscribe, selectorFn, selectorFn)
}
