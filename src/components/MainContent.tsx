import plus from '../images/plus.png';
import TodosTable from './TodosTable';
import Modals from './Modals';
import { useTodosDispatch } from '../Context';

export default function MainContent() {
  const todosDispatch = useTodosDispatch();

  const handleAddNewTodoClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    todosDispatch({ type: 'SHOW_FORM_MODAL', payload: null });
  };

  return (
    <main>
      <label htmlFor="new_item" onClick={handleAddNewTodoClick}>
        <img src={plus} alt="Add Todo Item"></img>
        <h2>Add new to do</h2>
      </label>
      <TodosTable />
      <Modals />
    </main>
  );
}
