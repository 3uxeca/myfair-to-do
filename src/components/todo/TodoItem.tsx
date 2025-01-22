import React from 'react'
import styled from "@emotion/styled";
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

const TodoItem = ({ todo, onToggle, onRemove }: TodoItemProps) => {
  return (
    <TodoItemWrapper>
      <div className='textWrap'>
        <TodoToggle
          className='toggle'
          completed={todo.completed}
          onClick={() => onToggle(todo.id)}
        >
          <CheckIcon width='20' height='20' fill='#ffffff' />
        </TodoToggle>
        <div className='text'>{todo.text}</div>
      </div>
      <div onClick={() => onRemove(todo.id)}>
        <RemoveIcon width='24' height='24' fill='#898989' />
      </div>
    </TodoItemWrapper>
  )
}

export default TodoItem