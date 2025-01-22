import { useRecoilState } from "recoil";
import { todoListState, Todo, todoTabState, TodoTabsKey } from "@/store/atoms";

export const useTodoActions = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const addTodo = (newTodo: Todo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (todoId: number) => {
    setTodoList(todoList.filter((todo: Todo) => todo.id !== todoId));
  };

  const toggleTodo = (todoId: number) => {
    setTodoList(
      todoList.map((todo: Todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return { todoList, addTodo, removeTodo, toggleTodo };
};