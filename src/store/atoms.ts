import { AtomEffect, atom, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

//Next.js에서 persistAtom을 쓰기 위한 구성
const ssrCompletedState = atom({
  key: "SsrCompleted",
  default: false,
});

export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

const { persistAtom } = recoilPersist();


export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param));
};

// atoms 시작

// Todo 타입 정의
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
};

// todoListState 초기화
export const todoListState = atom({
  key: "todoListState",
  default: [] as Todo[],
  effects_UNSTABLE: [persistAtomEffect],
});

// TodoTab 타입 정의
export type TodoTabsKey = 'all' | 'todo' | 'done';

// todoTabState 초기화
export const todoTabState = atom({
  key: "todoTabState",
  default: 'all',
  effects_UNSTABLE: [persistAtomEffect],
})