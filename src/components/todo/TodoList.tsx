"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTodoActions } from "@/hooks/useTodoActions";
import CheckIcon from '@public/images/Check.svg';
import RemoveIcon from '@public/images/Close.svg';
import { Todo, TodoTabsKey } from "@/store/atoms";

type Props = {}

interface TodoToggleProps {
  completed: boolean;
}

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;

  button {
    margin: 0 8px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    background-color: #f0f0f0;
    cursor: pointer;
    &:hover {
      background-color: #e0e0e0;
    }
    &.active {
      background-color: #2182f3;
      color: #fff;
    }
  }
`;

const Stats = styled.div`
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
`;

const TodoItem = styled.li`
  -ms-display: flexbox;
  display: flex;
  flex-wrap: wrap;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;     

  .textWrap {
    -ms-display: flexbox;
    display: flex;
    flex-wrap: wrap;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;    
    -webkit-align-items: center;
    align-items: center;       
  }
`;
const TodoToggle = styled.div<TodoToggleProps>`
    width: 32px;
    height: 32px;
    border: 1px solid #e5e5e5;
    border-radius: 99px;
    background-color: ${(props) => props.completed ? '#2182f3' : '#ffffff'};
    -ms-display: flexbox;
    display: flex;
    flex-wrap: wrap;
    -webkit-justify-content: center;
    justify-content: center;        
    -webkit-align-items: center;
    align-items: center;    
`;

const TodoList = (props: Props) => {
  const { todoList, addTodo, removeTodo, toggleTodo } = useTodoActions();
  const [selectedTab, setSelectedTab] = useState<TodoTabsKey>("all");

  // 필터링된 리스트 계산
  const filteredTodoList = todoList.filter((todo) => {
    if (selectedTab === "todo") return !todo.completed;
    if (selectedTab === "done") return todo.completed;
    return true; // All
  });

  // 각 상태의 총 개수 계산
  const totalCount = todoList.length;
  const todoCount = todoList.filter((todo) => !todo.completed).length;
  const doneCount = todoList.filter((todo) => todo.completed).length;  

  return (
    <div>
      {/* 탭 버튼 */}
      <Tabs>
        <button
          className={selectedTab === "all" ? "active" : ""}
          onClick={() => setSelectedTab("all")}
        >
          All
        </button>
        <button
          className={selectedTab === "todo" ? "active" : ""}
          onClick={() => setSelectedTab("todo")}
        >
          To Do
        </button>
        <button
          className={selectedTab === "done" ? "active" : ""}
          onClick={() => setSelectedTab("done")}
        >
          Done
        </button>
      </Tabs>

      {/* 상태별 총 개수 표시 */}
      <Stats>
        {`총 ${selectedTab === 'all' ? totalCount : selectedTab === 'todo' ? todoCount : doneCount}개`}
      </Stats>      
      <ul>
        {filteredTodoList.map((todo) => (
          <TodoItem key={todo.id}>
            <div className='textWrap'>
              <TodoToggle 
                className='toggle'
                completed={todo.completed}
                onClick={() => toggleTodo(todo.id)}
              >
                <CheckIcon width='20' height='20' fill='#ffffff' />
              </TodoToggle>
              <div className='text'>{todo.text}</div>
            </div>
            <div onClick={() => removeTodo(todo.id)}><RemoveIcon width='24' height='24' fill='#898989' /></div>
          </TodoItem>
        ))}
      </ul>       
    </div>
  )
}

export default TodoList