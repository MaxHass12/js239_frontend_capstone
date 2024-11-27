import { CreateTodoData, TodoFormData, UpdateTodoData } from './types';

export const parseCreateTodoData = (data: TodoFormData): CreateTodoData => {
  const result: { [index: string]: string; title: string } = { title: '' };

  if (data.title.trim().length < 3) {
    throw new Error('TOO_SHORT_TITLE');
  }

  if (data.description.trim().length !== 0) {
    result.description = data.description.trim();
  }

  if (data.day !== 'Day') {
    result.day = data.day;
  }

  if (data.month !== 'Month') {
    result.month = data.month;
  }

  if (data.year !== 'Year') {
    result.year = data.year;
  }

  result.title = data.title.trim();

  return result;
};

export const parseUpdateTodoData = (data: TodoFormData): UpdateTodoData => {
  const result: { [index: string]: string } = {};

  if (data.title.trim().length < 3) {
    throw new Error('TOO_SHORT_TITLE');
  }

  result.title = data.title;

  if (data.description.trim().length !== 0) {
    result.description = data.description.trim();
  }

  if (data.day !== 'Day') {
    result.day = data.day;
  }

  if (data.month === 'Month') {
    data.month = '  ';
  }

  result.month = data.month;

  if (data.year === 'Year') {
    data.year = '    ';
  }

  return result;
};
