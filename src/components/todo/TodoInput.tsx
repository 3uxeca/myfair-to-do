import { useTodoActions } from '@/hooks/useTodoActions';
import { useTodoStats } from '@/hooks/useTodoStats';
import styled from '@emotion/styled';
import React, { useState } from 'react'

type Props = {}

const Input = styled.input`
  width: 100%;
  padding: 32px;
  margin-bottom: 32px;
  background-color: #e5e5e5;
  border: none;
  border-radius: 24px;
  font-size: 20px;
  font-weight: 400;
  color: #000000;
  outline: none;
  appearance: none;
  -webkit-appearance: none;  
  box-sizing: border-box;
  &::placeholder {
    color: #898989;
  }
`;

const TodoInput = (props: Props) => {
  const { todoList, addTodo } = useTodoActions();
  const [newTodoText, setNewTodoText] = useState('');
  const { todoCount } = useTodoStats(todoList);  

  const handleAddTodo = () => {
    if (!newTodoText) {
      alert('할 일을 입력해 주세요.');
      return;
    }
    // 조건 확인: 10개 이상이면 추가 금지
    if (todoCount >= 10) {
      alert('할 일이 너무 많습니다. 완료 후 새로운 할 일을 추가하세요!');
      return;
    }

    if (newTodoText.trim()) {
      addTodo({ id: Date.now(), text: newTodoText, completed: false });
      setNewTodoText('');
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
    <Input
      type='text'
      value={newTodoText}
      placeholder='할 일을 입력해 주세요'
      maxLength={20}
      onChange={(e) => setNewTodoText(e.target.value)}
      onKeyDown={onKeydown}
    />   
  )
}

export default TodoInput