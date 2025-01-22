import { Todo } from "@/store/atoms";

export const useTodoStats = (todoList: Todo[]) => {
  const totalCount = todoList.length;
  const todoCount = todoList.filter((todo) => !todo.completed).length;
  const doneCount = todoList.filter((todo) => todo.completed).length;

  return { totalCount, todoCount, doneCount };
}