"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import TodoList from "../todo/TodoList";
import TodoInput from "../todo/TodoInput";

const Container = styled.div`
  background-color: #f6f6f6;
  padding: 128px 0;
`;
const Wrapper = styled.div`
  max-width: 737px;
  margin: 0 auto;
  position: relative;
  -ms-display: flexbox;
  display: flex;
  flex-wrap: wrap;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;  
  flex-direction: column;
  box-sizing: border-box;
`;
const Title = styled.div`
  font-size: 56px;
  font-weight: 700;
  line-height: 72px;
  color: #333333;
  margin-bottom: 64px;
`;


interface Props {}

const TodoUserListPage = ({}: Props) => {
  return (
    <Container>
      <Wrapper>
        <Title>To Do List</Title>
        <TodoInput />     
        <TodoList />
      </Wrapper>
    </Container>
  );
};

export default TodoUserListPage;
