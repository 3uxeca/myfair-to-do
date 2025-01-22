import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';
import { Todo } from '@/store/atoms';

afterEach(cleanup);

describe('TodoItem Component', () => {
  const mockOnToggle = jest.fn();
  const mockOnRemove = jest.fn();

  const todo: Todo = {
    id: 1,
    text: '출근하고 비타민 먹기',
    completed: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('할 일의 내용이 잘 표시 되는지 여부', () => {
    render(<TodoItem todo={todo} onToggle={mockOnToggle} onRemove={mockOnRemove} />);

    const todoText = screen.getByText('출근하고 비타민 먹기');
    expect(todoText).toBeInTheDocument();
  });

  it('초기화 상태의 토글 버튼이 정상적으로 렌더링 되는지 여부', () => {
    render(<TodoItem todo={todo} onToggle={mockOnToggle} onRemove={mockOnRemove} />);

    const toggleButton = screen.getByTestId('toggle-todo');
    expect(toggleButton).toHaveStyle('background-color: #ffffff');
  });

  it('토글 버튼을 클릭했을 때 onToggle 함수가 정상적으로 실행되는지 여부', () => {
    render(<TodoItem todo={todo} onToggle={mockOnToggle} onRemove={mockOnRemove} />);

    const toggleButton = screen.getByTestId('toggle-todo');
    fireEvent.click(toggleButton);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it('할 일 삭제 버튼 클릭 시 onRemove 함수가 정상적으로 실행되는지 여부', () => {
    render(<TodoItem todo={todo} onToggle={mockOnToggle} onRemove={mockOnRemove} />);

    const removeButton = screen.getByTestId('remove-todo');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });

  it('완료된 할 일의 스타일이 정상적으로 적용되는지 여부', () => {
    const completedTodo = { ...todo, completed: true };
    render(<TodoItem todo={completedTodo} onToggle={mockOnToggle} onRemove={mockOnRemove} />);

    const todoText = screen.getByText('출근하고 비타민 먹기');
    const toggleButton = screen.getByTestId('toggle-todo');

    expect(todoText).toHaveStyle('color: #868686');
    expect(toggleButton).toHaveStyle('background-color: #2182f3');
  });
});