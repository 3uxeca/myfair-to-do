"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTodoActions } from "@/hooks/useTodoActions";
import TodoList from "../todo/TodoList";

const Container = styled.div`
  position: relative;
  -ms-display: flexbox;
  display: flex;
  flex-wrap: wrap;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;  
`;
const Title = styled.div`
  font-size: 56px;
  font-weight: 700;
  line-height: 72px;
  color: #333333;
`;


interface Props {}

const TodoUserListPage = ({}: Props) => {
  const { todoList, addTodo, removeTodo, toggleTodo } = useTodoActions();
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo({ id: Date.now(), text: newTodoText, completed: false });
      setNewTodoText("");
    }
  };

  const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log(event.target, newTodoText);
      handleAddTodo();  // Enter 키를 감지하고 handleAddTodo 함수 호출
    }
    return true;
  };  

  return (
    <Container>
      <Title>To Do List</Title>
      <input
        type="text"
        value={newTodoText}
        placeholder="할 일을 입력해 주세요"
        maxLength={20}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyDown={onKeydown}
      />           
      <TodoList />
    </Container>
  );
};

export default TodoUserListPage;
