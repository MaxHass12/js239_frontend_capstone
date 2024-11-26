import { useTodosState } from '../Context';
import TableRows from './TableRows';

export default function TodosTable() {
  const state = useTodosState();

  const openTodos = state.todos.filter((todo) => !todo.completed);
  const closedTodos = state.todos.filter((todo) => todo.completed);

  return (
    <table cellSpacing="0">
      <tbody>
        <TableRows todos={openTodos} is_for_deleted_todos={false} />
        <TableRows todos={closedTodos} is_for_deleted_todos={true} />
      </tbody>
    </table>
  );
}
