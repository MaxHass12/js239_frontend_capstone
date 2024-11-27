export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  day: string;
  month: string;
  year: string;
}

export interface CreateTodoData {
  title: string;
  description?: string;
  day?: string;
  month?: string;
  year?: string;
}

export interface UpdateTodoData {
  title?: string;
  description?: string;
  day?: string;
  month?: string;
  year?: string;
}

export type TodoFormData = Omit<Todo, 'id' | 'completed'>;
