/**
 * @file 高性能 Context
 * @description 避免了 all context re-render ,实现更精细化的组件重渲染。
 */

import PerfContextProvider from "./context-component";
export { usePerfContext, useSelector } from "./use-selector";

export default PerfContextProvider;
