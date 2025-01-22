import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';
import { useTodoActions } from '@/hooks/useTodoActions';
import { useFilteredTodos } from '@/hooks/useFilteredTodos';
import { useTodoStats } from '@/hooks/useTodoStats';
import { useTodoTab } from '@/hooks/useTodoTab';

jest.mock('@/hooks/useTodoActions');
jest.mock('@/hooks/useFilteredTodos');
jest.mock('@/hooks/useTodoStats');
jest.mock('@/hooks/useTodoTab');

const mockTodoList = [
  { id: 1, text: '출근하고 비타민 먹기', completed: false },
  { id: 2, text: '퇴근하고 운동하기', completed: true },
  { id: 3, text: '주간회의 참여하기', completed: false },
];

describe('TodoList Component', () => {
  const mockAddTodo = jest.fn();
  const mockRemoveTodo = jest.fn();
  const mockToggleTodo = jest.fn();
  const mockSelectTodoTab = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTodoActions as jest.Mock).mockReturnValue({
      todoList: mockTodoList,
      addTodo: mockAddTodo,
      removeTodo: mockRemoveTodo,
      toggleTodo: mockToggleTodo,
    });

    (useFilteredTodos as jest.Mock).mockReturnValue(mockTodoList);

    (useTodoStats as jest.Mock).mockReturnValue({
      totalCount: 3,
      todoCount: 2,
      doneCount: 1,
    });

    (useTodoTab as jest.Mock).mockReturnValue({
      todoTab: 'all',
      selectTodoTab: mockSelectTodoTab,
    });
  });

  it('할 일 목록이 제대로 렌더링되는지 여부', () => {
    render(<TodoList />);

    expect(screen.getByText('총 3개')).toBeInTheDocument();
    mockTodoList.forEach((todo) => {
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });
  });

  it('할 일의 토글 버튼 클릭 시 onToggle이 정상적으로 호출되는지 여부', () => {
    render(<TodoList />);

    const toggleButton = screen.getAllByTestId('toggle-todo')[0];
    fireEvent.click(toggleButton);

    expect(mockToggleTodo).toHaveBeenCalledTimes(1);
    expect(mockToggleTodo).toHaveBeenCalledWith(1);
  });

  it('완료된 할 일에 토글 버튼을 클릭할 때 할 일 목록 데이터가 10개 이상인 경우 alert 호출 여부', () => {
    (useTodoStats as jest.Mock).mockReturnValue({
      totalCount: 12,
      todoCount: 10,
      doneCount: 2,
    });

    render(<TodoList />);

    const toggleButton = screen.getAllByTestId('toggle-todo')[1];
    window.alert = jest.fn();

    fireEvent.click(toggleButton);

    expect(window.alert).toHaveBeenCalledWith(
      '할 일이 너무 많습니다. 완료한 일을 삭제하거나, 할 일을 완료한 후 새로운 할 일을 추가하세요!'
    );
    expect(mockToggleTodo).not.toHaveBeenCalled();
  });

  it('할 일 삭제 시 onRemove 함수가 정상적으로 호출되는지 여부', () => {
    render(<TodoList />);

    const removeButton = screen.getAllByTestId('remove-todo')[0];
    fireEvent.click(removeButton);

    expect(mockRemoveTodo).toHaveBeenCalledTimes(1);
    expect(mockRemoveTodo).toHaveBeenCalledWith(1);
  });

  it('탭 클릭 시 해당 배지에 맞는 데이터로 업데이트 되는지 여부', () => {
    render(<TodoList />);

    const tabs = screen.getAllByRole('tab');
    fireEvent.click(tabs[1]);

    expect(mockSelectTodoTab).toHaveBeenCalledTimes(1);
    expect(mockSelectTodoTab).toHaveBeenCalledWith('todo');
  });
});