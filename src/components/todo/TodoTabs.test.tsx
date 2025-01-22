import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoTabs from './TodoTabs';
import { TodoTabsKey } from '@/store/atoms';

describe('TodoTabs Component', () => {
  const mockOnChangeTab = jest.fn();

  it('세 개의 배지에 해당하는 탭이 정상적으로 렌더링 되는지 여부', () => {
    render(<TodoTabs selectedTab="all" onChangeTab={mockOnChangeTab} />);

    const allTab = screen.getByRole('tab', { name: 'All' });
    const todoTab = screen.getByRole('tab', { name: 'To Do' });
    const doneTab = screen.getByRole('tab', { name: 'Done' });

    expect(allTab).toBeInTheDocument();
    expect(todoTab).toBeInTheDocument();
    expect(doneTab).toBeInTheDocument();
  });

  it('활성화된 탭이 정상적으로 렌더링 되는지 여부', () => {
    render(<TodoTabs selectedTab="todo" onChangeTab={mockOnChangeTab} />);

    const todoTab = screen.getByRole('tab', { name: 'To Do' });
    expect(todoTab).toHaveClass('active');
  });

  it('탭 클릭 시 onChangeTab 함수가 정상적으로 호출되는지 여부', () => {
    render(<TodoTabs selectedTab="all" onChangeTab={mockOnChangeTab} />);

    const doneTab = screen.getByRole('tab', { name: 'Done' });
    fireEvent.click(doneTab);

    expect(mockOnChangeTab).toHaveBeenCalledTimes(1);
    expect(mockOnChangeTab).toHaveBeenCalledWith('done');
  });
});