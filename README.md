# use-perf-context

| title        | content           |
| ------------ | ----------------- |
| 系统名称     | use-perf-context  |
| 项目负责人   | mortimerliu(阿吉) |
| 作者         | mortimerliu(阿吉) |
| 文档提交日期 | 2022.10.14        |

<br />
<br />

<ins>修订历史</ins>

| 版本号 | 作者        | 修订章节 | 修订原因      | 修订日期   |
| ------ | ----------- | -------- | ------------- | ---------- |
| 1.0    | mortimerliu | all      | first publish | 2022.10.14 |

<br />
<br />

# 1.About

This is a hight performance react component, which avoid re-render of Context Component.

This implements a more refined rendering strategy and you don't feel it.

Actually, two common ways to avoid re-render are multi-layered contexts and memo components.

Nut they make number of codes too much.I don't like those ways.

I want something easy to use, and the number of my codes is less.

Then use-perf-context was born.

# 2.Usage

```typescript
// App.tsx
import PerfContextProvider from "use-perf-context";
function App() {
  // provide Context
  return (
    <PerfContextProvider state={initialState} reducer={globalReducer}>
      <Header />
      <YourComponents />
    </PerfContextProvider>
  );
}

// Header.tsx
import PerfContextProvider from "use-perf-context";
function Header() {
  // consume Context
  // usePerfContext<target property type constraint, dispatch's parame type constraint>
  const [userInfo, dispatch] = usePerfContext<IUserInfo, IAction>("userInfo");

  const { name, age } = userInfo || {};
  renderCount++;
  const addAge = () => {
    dispatch({
      type: ActionType.SET_USER_INFO,
      payload: { name: "mortimer", age: Number(age) + 1 },
    });
  };

  return (
    <div className={classPrefix}>
      <div>{classPrefix}</div>
      <div>user name is ：{name}</div>
      <div>user age is ：{age}</div>
      <button onClick={addAge}>add age +1</button>
      <div>renderCount: {renderCount}</div>
    </div>
  );
}

// Context Store
export interface IUserInfo {
  name: string;
  age: number;
}
export interface IAction {
  type: ActionType;
  payload?: any;
}
export enum ActionType {
  SET_USER_INFO = "SET_USER_INFO",
}
export const initialState: IState = {
  userInfo: {
    name: "",
    age: 0,
  },
};
export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionType.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};
```

# 3.example demo

CodeSandBox demo: https://codesandbox.io/s/void4-context-rerender--proxy-completed-emv5n0?file=/src/store/index.tsx
