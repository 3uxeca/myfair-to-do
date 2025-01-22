import { Todo, TodoTabsKey } from "@/store/atoms";
import React from "react";

export const useFilteredTodos = (todoList: Todo[], selectedTab: TodoTabsKey) => {
  return React.useMemo(() => {
    if(selectedTab === 'todo') return todoList.filter((todo) => !todo.completed);
    if(selectedTab === 'done') return todoList.filter((todo) => todo.completed);
    return todoList;
  }, [todoList, selectedTab]);
};