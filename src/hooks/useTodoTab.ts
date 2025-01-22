import { TodoTabsKey, todoTabState } from "@/store/atoms";
import { useRecoilState } from "recoil";

export const useTodoTab = () => {
  const [todoTab, setTodoTab] = useRecoilState(todoTabState);

  const selectTodoTab = (tab: TodoTabsKey) => {
    setTodoTab(tab);
  };

  return { todoTab, selectTodoTab };
};