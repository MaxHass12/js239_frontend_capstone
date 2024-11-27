import { useTodosDispatch, useTodosState } from '../Context';
import DateSelect from './DateSelect';
import { parseCreateTodoData, parseUpdateTodoData } from '../utils';
import { createTodo, markTodoCompleted, updateTodo } from '../dbAPI';
import { Todo } from '../types';

const TodoForm = () => {
  const selectedTodo = useTodosState().selectedTodo;
  const todoDispatch = useTodosDispatch();

  const title = selectedTodo ? selectedTodo.title : '';
  const description = selectedTodo ? selectedTodo.description : '';
  const day = selectedTodo ? selectedTodo.day : '';
  const month = selectedTodo ? selectedTodo.month : '';
  const year = selectedTodo ? selectedTodo.year : '';

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const fd = new FormData(event.target as HTMLFormElement);

    const title = fd.get('title') as string;
    const day = fd.get('due_day') as string;
    const month = fd.get('due_month') as string;
    const year = fd.get('due_year') as string;
    const description = fd.get('description') as string;

    if (selectedTodo) {
      try {
        const updateTodoData = parseUpdateTodoData({
          title,
          day,
          month,
          year,
          description,
        });

        const response = await updateTodo(selectedTodo.id, updateTodoData);
        todoDispatch({ type: 'UPDATE_TODO', payload: response as Todo });
      } catch (err: unknown) {
        console.log(err);
        if (err instanceof Error) {
          if (err.message === 'TOO_SHORT_TITLE') {
            alert('Title must be at least 3 characters long');
          } else {
            alert('Could not Update Todo');
          }
        } else {
          alert('Some unknown error occured');
        }
      }
    } else {
      try {
        const createTodoData = parseCreateTodoData({
          title,
          day,
          month,
          year,
          description,
        });
        const response = await createTodo(createTodoData);
        todoDispatch({ type: 'ADD_TODO', payload: response as Todo });
      } catch (err: unknown) {
        console.log(err);
        if (err instanceof Error) {
          if (err.message === 'TOO_SHORT_TITLE') {
            alert('Title must be at least 3 characters long');
          } else {
            alert('Could not create Todo');
          }
        } else {
          alert('Some unknown error occured');
        }
      }
    }
  };

  const handleMarkCompleted = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (selectedTodo) {
      try {
        await markTodoCompleted(selectedTodo.id);
        todoDispatch({ type: 'MARK_COMPLETE', payload: selectedTodo.id });
      } catch (err) {
        console.log(err);
        alert('Could not mark Todo as complete');
      }
    } else {
      alert('Can not mark completed as the Todo does not exist.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <fieldset>
        <ul>
          <li>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Item 1"
              defaultValue={title}
            />
          </li>
          <li>
            <label htmlFor="due">Due Date</label>
            <DateSelect day={day} month={month} year={year} />
          </li>
          <li>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              cols={50}
              rows={7}
              placeholder="Description"
              defaultValue={description}
            ></textarea>
          </li>
          <li>
            <input type="submit" value="Save" />
            <button name="complete" onClick={handleMarkCompleted}>
              Mark As Complete
            </button>
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default TodoForm;
