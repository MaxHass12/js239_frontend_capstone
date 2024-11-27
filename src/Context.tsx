import { useContext, useReducer, createContext } from 'react';
import { Todo } from './types';

interface TodosState {
  todos: Array<Todo>;
  isFormModalVisible: boolean;
  selectedTodo: Todo | null;
}

// const EMPTY_TODO: Todo = {
//   id: 0,
//   title: '',
//   day: '',
//   month: '',
//   year: '',
//   description: '',
//   completed: false,
// };

const INITIAL_STATE: TodosState = {
  todos: [],
  isFormModalVisible: false,
  selectedTodo: null,
};

type TodosAction =
  | { type: 'LOAD_TODOS'; payload: Array<Todo> }
  | { type: 'SHOW_FORM_MODAL'; payload: number | null }
  | { type: 'CLOSE_FORM_MODAL' }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'MARK_COMPLETE'; payload: number }
  | { type: 'TOGGLE_TODO_COMPLETE'; payload: number };

const todosReducer = (state: TodosState, action: TodosAction): TodosState => {
  switch (action.type) {
    case 'LOAD_TODOS': {
      state.todos = action.payload;
      break;
    }
    case 'SHOW_FORM_MODAL': {
      state.isFormModalVisible = true;
      if (action.payload) {
        const selectedTodo = state.todos.find(
          (todo) => todo.id === action.payload
        );

        if (!selectedTodo) {
          alert('The Todo Does Not Exist');
          return state;
        } else {
          state.selectedTodo = selectedTodo;
        }
      }
      break;
    }
    case 'CLOSE_FORM_MODAL': {
      state.isFormModalVisible = false;
      state.selectedTodo = null;
      break;
    }
    case 'DELETE_TODO': {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      break;
    }
    case 'ADD_TODO': {
      state.todos = state.todos.concat(action.payload);
      state.isFormModalVisible = false;
      state.selectedTodo = null;
      break;
    }
    case 'UPDATE_TODO': {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        } else {
          return todo;
        }
      });
      state.isFormModalVisible = false;
      state.selectedTodo = null;
      break;
    }
    case 'MARK_COMPLETE': {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        } else {
          return todo;
        }
      });
      state.isFormModalVisible = false;
      state.selectedTodo = null;
      break;
    }
    case 'TOGGLE_TODO_COMPLETE': {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      });
      state.isFormModalVisible = false;
      state.selectedTodo = null;
      break;
    }
    default: {
      const _action: never = action.type;
      console.log(_action);
      throw new Error('Invalid Action Type');
    }
  }

  return { ...state };
};

interface TodosContextType {
  state: TodosState;
  dispatch: React.Dispatch<TodosAction>;
}

const TodosContext = createContext<TodosContextType | null>(null);

export const TodosContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(todosReducer, INITIAL_STATE);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodosState = (): TodosState => {
  const todosContext = useContext(TodosContext);
  if (!todosContext) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return todosContext.state;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodosDispatch = () => {
  const todosContext = useContext(TodosContext);
  if (!todosContext) {
    throw new Error('useCounter must be used within a CounterProvider');
  }

  return todosContext.dispatch;
};
