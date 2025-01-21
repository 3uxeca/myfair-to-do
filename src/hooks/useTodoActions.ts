import { useRecoilState } from "recoil";
import { todoListState, Todo, todoTabState } from "@/store/atoms";

export const useTodoActions = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [todoTab, setTodoTab] = useRecoilState(todoTabState);

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

  const selectTodoTab = (tab: string) => {
    setTodoTab(tab);
  }

  return { todoList, addTodo, removeTodo, toggleTodo, todoTab, selectTodoTab };
};