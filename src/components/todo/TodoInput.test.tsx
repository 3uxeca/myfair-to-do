import "@testing-library/jest-dom";
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import TodoInput from './TodoInput';
import { useTodoActions } from '@/hooks/useTodoActions';
import { useTodoStats } from '@/hooks/useTodoStats';
import { Todo } from '@/store/atoms';

afterEach(cleanup);

jest.mock('@/hooks/useTodoActions');
jest.mock('@/hooks/useTodoStats');

describe('TodoInput Component', () => {
  const mockAddTodo = jest.fn();
  const mockTodoList = [] as Todo[];
  const mockTodoStats = { todoCount: 0 };

  beforeEach(() => {
    jest.clearAllMocks();
    (useTodoActions as jest.Mock).mockReturnValue({
      todoList: mockTodoList,
      addTodo: mockAddTodo,
    });
    (useTodoStats as jest.Mock).mockReturnValue(mockTodoStats);
  });

  it('input이 잘 생성 되는지 여부', () => {
    render(<TodoInput />);
    const inputElement = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(inputElement).toBeInTheDocument();
  });

  it('input에 입력이 잘 되는지 여부', () => {
    render(<TodoInput />);
    const inputElement = screen.getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(inputElement, { target: { value: '할 일' } });
    expect(inputElement).toHaveValue('할 일');
  });

  it('빈 값인 경우 Enter 입력 시 alert 여부', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<TodoInput />);
    const inputElement = screen.getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(window.alert).toHaveBeenCalledWith('할 일을 입력해 주세요.');
  });

  it('input Enter 입력 시 완료되지 않은 할 일이 10개 이상인 경우 alert 여부', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    (useTodoStats as jest.Mock).mockReturnValue({ todoCount: 10 });
    render(<TodoInput />);

    const inputElement = screen.getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(inputElement, { target: { value: '주간회의 참여하기' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(window.alert).toHaveBeenCalledWith(
      '할 일이 너무 많습니다. 완료 후 새로운 할 일을 추가하세요!'
    );
  });

  it('Enter 입력 시 addTodo에 정확한 데이터가 전달되는지 여부', () => {
    render(<TodoInput />);

    const inputElement = screen.getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(inputElement, { target: { value: '출근하고 비타민 먹기' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(mockAddTodo).toHaveBeenCalledWith({
      id: expect.any(Number),
      text: '출근하고 비타민 먹기',
      completed: false,
    });
  });

  it('to do 항목 추가 시 input 초기화 여부', () => {
    render(<TodoInput />);

    const inputElement = screen.getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(inputElement, { target: { value: '퇴근하고 운동하기' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(inputElement).toHaveValue('');
  });

  it('input 한국어 입력 값이 조합되는 동안 todo의 추가를 막을 수 있는지 여부', () => {
    render(<TodoInput />);

    const inputElement = screen.getByPlaceholderText('할 일을 입력해 주세요');
    // Composing 상태 시작
    fireEvent.compositionStart(inputElement);
    fireEvent.change(inputElement, { target: { value: '새로운 할 일' } });

    // Enter 키 입력 (Composing 상태 유지 중)
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    // Composing 상태 종료
    fireEvent.compositionEnd(inputElement);    

    expect(mockAddTodo).not.toHaveBeenCalled(); 
  });
});