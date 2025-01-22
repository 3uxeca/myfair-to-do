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
  const { todoCount } = useTodoStats(todoList);  
  const [newTodoText, setNewTodoText] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  
  const handleComposition = (e:React.CompositionEvent<HTMLInputElement>) => {
    if(e.type === 'compositionstart') {
      setIsComposing(true);
    }
    if(e.type === 'compositionend') {
      setIsComposing(false);
    }
  }

  const handleAddTodo = () => {
    if (!newTodoText.trim()) {
      alert('할 일을 입력해 주세요.');
      return;
    }
  
    if (todoCount >= 10) {
      alert('할 일이 너무 많습니다. 완료 후 새로운 할 일을 추가하세요!');
      return;
    }
  
    // 상태 업데이트와 할 일 추가
    addTodo({ id: Date.now(), text: newTodoText.trim(), completed: false });
    setNewTodoText(''); // 상태 초기화
  };

  const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // if (event.nativeEvent.isComposing) return;  // 크롬 브라우저에서 한글을 사용하는 경우에 발생하는 2회 입력 문제 발생 방지
      if(!isComposing) {
        handleAddTodo();  // Enter 키를 감지하고 handleAddTodo 함수 호출
      }
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
      onCompositionStart={handleComposition}
      onCompositionEnd={() => setIsComposing(false)}
      onKeyDown={onKeydown}
    />   
  )
}

export default TodoInput