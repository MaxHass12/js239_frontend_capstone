import { useContext, useReducer, createContext } from 'react';
import { Todo } from './types';

interface TodosState {
  todos: Array<Todo>;
}

const INITIAL_STATE: TodosState = {
  todos: [],
};

type TodosAction = { type: 'LOAD_TODOS'; payload: Array<Todo> };

const todosReducer = (state: TodosState, action: TodosAction): TodosState => {
  switch (action.type) {
    case 'LOAD_TODOS': {
      state.todos = action.payload;
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
