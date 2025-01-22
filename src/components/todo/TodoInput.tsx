import { useFilteredTodos } from '@/hooks/useFilteredTodos';
import { useTodoActions } from '@/hooks/useTodoActions';
import React, { useState } from 'react'

type Props = {}

const TodoInput = (props: Props) => {
  const { todoList, addTodo } = useTodoActions();
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
    <input
      type="text"
      value={newTodoText}
      placeholder="할 일을 입력해 주세요"
      maxLength={20}
      onChange={(e) => setNewTodoText(e.target.value)}
      onKeyDown={onKeydown}
    />   
  )
}

export default TodoInput