import React, { useEffect, useReducer, useRef, useMemo } from "react";
import { getEventEmitter, STORE_STATE_CHANGE_EVENT } from "./utils/index";
import { PerfContext } from "./use-selector";

interface Iprops<A, S> {
  reducer: (state: S, action: A) => S;
  state: S;
  children?: any;
}

/**
 * 高性能Context组件
 * @description 避免了 context re-render, 实现数据的细控渲染
 * @params  { reducer, state, context }
 *
 *        reducer:匹配器 state:初始化数据
 */
export default function PerfContextProvider<A, S>(props: Iprops<A, S>) {
  const { reducer, state } = props;
  const [storeState, dispatch] = useReducer(reducer, state);
  const storeStateRef = useRef(storeState);
  storeStateRef.current = storeState;
  const store = useMemo(
    () => ({
      getState: () => storeStateRef.current,
      dispatch,
    }),
    []
  );

  useEffect(() => {
    getEventEmitter().emit(STORE_STATE_CHANGE_EVENT);
  }, [storeState]);

  return (
    <PerfContext.Provider value={store}>{props.children}</PerfContext.Provider>
  );
}
