import { Todo } from '../types';
import trash from '../images/trash.png';
import checked from '../images/';

interface TableRowsProps {
  todos: Array<Todo>;
  is_for_deleted_todos: boolean;
}

export default function TableRows({
  todos,
  is_for_deleted_todos,
}: TableRowsProps) {
  return (
    <>
      {todos.map((todo) => {
        const id = `item_${todo.id}`;
        const date =
          todo.month && todo.year
            ? `${todo.month}/${todo.year}`
            : 'No Due Date';

        return (
          <tr data-id={todo.id} key={todo.id}>
            <td className="list_item">
              <input
                type="checkbox"
                name={id}
                id={id}
                checked={is_for_deleted_todos}
                onChange={() => console.log(todo.id)}
              />
              <span className="check"></span>
              <label htmlFor={id}>{`${todo.title} - ${date}`}</label>
            </td>
            <td className="delete">
              <img src={trash} alt="Delete" />
            </td>
          </tr>
        );
      })}
    </>
  );
}
