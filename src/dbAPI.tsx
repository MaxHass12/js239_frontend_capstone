import axios from 'axios';
import { CreateTodoData, Todo, UpdateTodoData } from './types';

export const getAllTodos = async () => {
  const response = await axios.get('/api/todos');
  if (Array.isArray(response.data)) {
    return response.data as Todo[];
  } else {
    throw new Error('Could not fetch todos');
  }
};

export const deleteTodo = async (id: string) => {
  await axios.delete('/api/todos/' + id);
};

export const createTodo = async (data: CreateTodoData) => {
  const response = await axios.post('/api/todos', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateTodo = async (id: number, data: UpdateTodoData) => {
  const response = await axios.put(`/api/todos/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const markTodoCompleted = async (id: number) => {
  const response = await axios.put(
    `/api/todos/${id}`,
    { completed: true },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const toggleTodoCompleted = async (todo: Todo) => {
  const response = await axios.put(
    `/api/todos/${todo.id}`,
    {
      completed: !todo.completed,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
