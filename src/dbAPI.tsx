import axios from 'axios';
import { Todo } from './types';

export const getAllTodos = async () => {
  const response = await axios.get('/api/todos');
  if (Array.isArray(response.data)) {
    return response.data as Todo[];
  } else {
    throw new Error('Could not fetch todos');
  }
};
