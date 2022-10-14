import React, {
  Dispatch,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getEventEmitter, STORE_STATE_CHANGE_EVENT } from "./utils/index";

/** 内置 Context */
export const PerfContext: any = React.createContext({
  getState: () => ({}),
  dispatch: () => ({}),
});

/** 获取函数组件强制渲染的方法 */
const useForceUpdate = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setState] = useState(false);
  return () => setState((val: boolean) => !val);
};

/**
 * 获取 context store 中的某个属性对象
 * @param selector
 */
export function useSelector<S>(selector: (state: any) => S): S {
  const forceUpdate = useForceUpdate();
  const store = useContext<any>(PerfContext);
  if (!store) {
    throw new Error("current component is not in PerfContextProvider");
  }

  const curSelector = useRef(selector);
  const curSelectorState = useRef(selector(store.getState()));
  curSelector.current = selector;
  curSelectorState.current = selector(store.getState());

  useEffect(() => {
    const checkForUpdates = () => {
      const newSelectedState = curSelector.current(store.getState());
      if (newSelectedState !== curSelectorState.current) {
        forceUpdate();
      }
    };
    getEventEmitter().on(STORE_STATE_CHANGE_EVENT, checkForUpdates);

    return () => {
      getEventEmitter().off(STORE_STATE_CHANGE_EVENT);
    };
  }, [store]);

  return curSelectorState.current;
}

/**
 * 使用Context
 * @param {string} targetKey context store 中的目标键名
 * @return {[any, ()=>()]} [store[targetKey], dispatch]
 */
export function usePerfContext<S, A>(targetKey: string): [S, Dispatch<A>] {
  const globalContext = useContext(PerfContext);
  const { dispatch = () => {} } = globalContext || ({} as any);
  const targetData = useSelector<S>((state: any) => state[targetKey]);

  return [targetData, dispatch];
}
