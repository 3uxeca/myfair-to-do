'use client';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useTodoActions } from '@/hooks/useTodoActions';
import TodoTabs from './TodoTabs';
import { useFilteredTodos } from '@/hooks/useFilteredTodos';
import { useTodoStats } from '@/hooks/useTodoStats';
import TodoItem from './TodoItem';
import { useTodoTab } from '@/hooks/useTodoTab';

type Props = {}

const ListWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 32px;
  box-sizing: border-box;
  box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.06);
`;

const Stats = styled.div`
  padding: 16px;
  font-size: 20px;
  font-weight: 400;
  color: #000000;
`;

const ItemList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const TodoList = (props: Props) => {
  const { todoList, addTodo, removeTodo, toggleTodo } = useTodoActions();
  const { todoTab, selectTodoTab } = useTodoTab();

  const [isHydrated, setIsHydrated] = useState(false);

  // 클라이언트에서만 렌더링하도록 설정
  useEffect(() => {
    setIsHydrated(true);
  }, []);  

  // 필터링된 리스트
  const filteredTodoList = useFilteredTodos(isHydrated ? todoList : [], todoTab);
  // 각 상태의 총 개수 계산
  const { totalCount, todoCount, doneCount } = useTodoStats(todoList);  
  
  const initialStats = { all: 0, todo: 0, done: 0 };
  const stats = isHydrated ? { all: totalCount, todo: todoCount, done: doneCount } : initialStats;


  const handleToggleTodo = (id: number) => {
    // 조건: completed가 false인 항목이 10개 이상일 경우
    const togglingTodo = todoList.find((t) => t.id === id);
    if (togglingTodo && togglingTodo.completed && stats.todo >= 10) {
      alert('할 일이 너무 많습니다. 완료한 일을 삭제하거나, 할 일을 완료한 후 새로운 할 일을 추가하세요!');
      return;
    }

    // 상태 토글
    toggleTodo(id);
  };  

  return (
    <ListWrapper>
      {/* 탭 버튼 */}
      <TodoTabs selectedTab={todoTab} onChangeTab={selectTodoTab} />

      {/* 상태별 총 개수 표시 */}
      <Stats>
        {`총 ${todoTab === 'all' ? stats.all : todoTab === 'todo' ? stats.todo : stats.done}개`}
      </Stats>      
      {/* 필터링 된 Todo 리스트 */}
      { isHydrated && (
        <ItemList>
          {filteredTodoList.map((todo) => (
            <TodoItem 
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onRemove={removeTodo}
            />
          ))}
        </ItemList>       
      )}
    </ListWrapper>
  )
}

export default TodoList