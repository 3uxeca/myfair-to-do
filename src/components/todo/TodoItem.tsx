import React from 'react'
import styled from '@emotion/styled';
import { Todo } from '@/store/atoms';
import CheckIcon from '@public/images/Check.svg';
import RemoveIcon from '@public/images/Close.svg';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

interface TodoToggleProps {
  completed: boolean;
}

const TodoItemWrapper = styled.li`
  padding: 32px 16px;
  -ms-display: flexbox;
  display: flex;
  flex-wrap: wrap;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;     
`;
const TodoTextWrapper = styled.div`
  -ms-display: flexbox;
  display: flex;
  flex-wrap: wrap;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;    
  -webkit-align-items: center;
  align-items: center;   
`;
const TodoText = styled.div<TodoToggleProps>`
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  color: ${(props) => props.completed ? '#868686' : '#000000'};;
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
    margin-right: 16px;
    cursor: pointer;
`;

const TodoRemove = styled.div`
  cursor: pointer;
`;

const TodoItem = ({ todo, onToggle, onRemove }: TodoItemProps) => {
  return (
    <TodoItemWrapper>
      <TodoTextWrapper className='textWrap'>
        <TodoToggle
          className='toggle'
          completed={todo.completed}
          onClick={() => onToggle(todo.id)}
        >
          <CheckIcon width='20' height='20' fill='#ffffff' />
        </TodoToggle>
        <TodoText className='text' completed={todo.completed}>{todo.text}</TodoText>
      </TodoTextWrapper>
      <TodoRemove onClick={() => onRemove(todo.id)}>
        <RemoveIcon width='24' height='24' fill='#b9b9b9' />
      </TodoRemove>
    </TodoItemWrapper>
  )
}

export default TodoItem