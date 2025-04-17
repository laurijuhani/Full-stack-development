import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

/* eslint-env jest */
import Todo from '../Todos/Todo';

describe('Todo Component', () => {
  const mockTodo = {
    id: 1,
    text: 'Test Todo',
    done: false,
  };

  const mockOnClickDelete = jest.fn();
  const mockOnClickComplete = jest.fn();

  test('renders the todo text', () => {
    render(
      <Todo
        todo={mockTodo}
        onClickDelete={mockOnClickDelete}
        onClickComplete={mockOnClickComplete}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('shows "This todo is not done" when the todo is not completed', () => {
    render(
      <Todo
        todo={mockTodo}
        onClickDelete={mockOnClickDelete}
        onClickComplete={mockOnClickComplete}
      />
    );

    expect(screen.getByText('This todo is not done')).toBeInTheDocument();
  });

  test('shows "This todo is done" when the todo is completed', () => {
    const completedTodo = { ...mockTodo, done: true };

    render(
      <Todo
        todo={completedTodo}
        onClickDelete={mockOnClickDelete}
        onClickComplete={mockOnClickComplete}
      />
    );

    expect(screen.getByText('This todo is done')).toBeInTheDocument();
  });

  test('calls onClickDelete when the delete button is clicked', () => {
    render(
      <Todo
        todo={mockTodo}
        onClickDelete={mockOnClickDelete}
        onClickComplete={mockOnClickComplete}
      />
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockOnClickDelete).toHaveBeenCalledWith(mockTodo);
  });

  test('calls onClickComplete when the complete button is clicked', () => {
    render(
      <Todo
        todo={mockTodo}
        onClickDelete={mockOnClickDelete}
        onClickComplete={mockOnClickComplete}
      />
    );

    const completeButton = screen.getByText('Set as done');
    fireEvent.click(completeButton);

    expect(mockOnClickComplete).toHaveBeenCalledWith(mockTodo);
  });
});