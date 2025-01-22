"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import TodoList from "../todo/TodoList";
import TodoInput from "../todo/TodoInput";

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
  return (
    <Container>
      <Title>To Do List</Title>
      <TodoInput />     
      <TodoList />
    </Container>
  );
};

export default TodoUserListPage;
