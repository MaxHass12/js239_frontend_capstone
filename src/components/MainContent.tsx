import plus from '../images/plus.png';
import TodosTable from './TodosTable';

export default function MainContent() {
  return (
    <main>
      <label htmlFor="new_item">
        <img src={plus} alt="Add Todo Item"></img>
        <h2>Add new to do</h2>
      </label>
      <TodosTable />
    </main>
  );
}
