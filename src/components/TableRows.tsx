import { Todo } from '../types';
import trash from '../images/trash.png';
import checked from '../images/';
import { useTodosDispatch } from '../Context';
import { deleteTodo, markTodoCompleted, toggleTodoCompleted } from '../dbAPI';

interface TableRowsProps {
  todos: Array<Todo>;
  is_for_deleted_todos: boolean;
}

export default function TableRows({
  todos,
  is_for_deleted_todos,
}: TableRowsProps) {
  const todosDispatch = useTodosDispatch();

  const handleEditTodo = (event: React.MouseEvent, todoId: number) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(todoId);

    todosDispatch({ type: 'SHOW_FORM_MODAL', payload: todoId });
  };

  const handleToggleTodoComplete = async (
    event: React.MouseEvent,
    todo: Todo
  ) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await toggleTodoCompleted(todo);
      todosDispatch({ type: 'TOGGLE_TODO_COMPLETE', payload: todo.id });
    } catch (err) {
      console.log(err);
      alert('Could not toggle Todo Complete');
    }
  };

  const handleDeleteTodo = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    event.stopPropagation();

    deleteTodo(id)
      .then(() => {
        todosDispatch({ type: 'DELETE_TODO', payload: Number(id) });
      })
      .catch((err) => {
        console.log(err);
        alert('Could not delete Todo');
      });
  };

  return (
    <>
      {todos.map((todo) => {
        const id = `item_${todo.id}`;
        const date =
          todo.month.trim() && todo.year.trim()
            ? `${todo.month}/${todo.year}`
            : 'No Due Date';

        return (
          <tr data-id={todo.id} key={todo.id}>
            <td
              className="list_item"
              onClick={(event) => handleToggleTodoComplete(event, todo)}
            >
              <input
                type="checkbox"
                name={id}
                id={id}
                defaultChecked={is_for_deleted_todos}
              />
              <span className="check"></span>
              <label
                htmlFor={id}
                onClick={(event) => handleEditTodo(event, todo.id)}
              >{`${todo.title} - ${date}`}</label>
            </td>
            <td
              className="delete"
              onClick={(event) => handleDeleteTodo(event, String(todo.id))}
            >
              <img src={trash} alt="Delete" />
            </td>
          </tr>
        );
      })}
    </>
  );
}
