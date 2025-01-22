"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTodoActions } from "@/hooks/useTodoActions";
import { Todo, TodoTabsKey } from "@/store/atoms";
import TodoTabs from "./TodoTabs";
import { useFilteredTodos } from "@/hooks/useFilteredTodos";
import { useTodoStats } from "@/hooks/useTodoStats";
import TodoItem from "./TodoItem";
import { useTodoTab } from "@/hooks/useTodoTab";

type Props = {}



const Stats = styled.div`
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
`;

const TodoList = (props: Props) => {
  const { todoList, addTodo, removeTodo, toggleTodo } = useTodoActions();
  const { todoTab, selectTodoTab } = useTodoTab();
  // 필터링된 리스트
  const filteredTodoList = useFilteredTodos(todoList, todoTab);

  // 각 상태의 총 개수 계산
  const { totalCount, todoCount, doneCount } = useTodoStats(todoList);

  const [isHydrated, setIsHydrated] = useState(false);

  // 클라이언트에서만 렌더링하도록 설정
  useEffect(() => {
    setIsHydrated(true);
  }, []);  


  if (!isHydrated) {
    return null; // Hydration 문제가 발생하지 않도록 클라이언트에서만 렌더링
  }  

  return (
    <div>
      {/* 탭 버튼 */}
      <TodoTabs selectedTab={todoTab} onChangeTab={selectTodoTab} />

      {/* 상태별 총 개수 표시 */}
      <Stats>
        {`총 ${todoTab === 'all' ? totalCount : todoTab === 'todo' ? todoCount : doneCount}개`}
      </Stats>      
      {/* 필터링 된 Todo 리스트 */}
      <ul>
        {filteredTodoList.map((todo) => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
          />
        ))}
      </ul>       
    </div>
  )
}

export default TodoList