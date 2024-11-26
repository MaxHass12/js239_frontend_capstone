import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { getAllTodos } from './dbAPI';
import { useEffect } from 'react';
import { useTodosDispatch } from './Context';

function App() {
  const dispatch = useTodosDispatch();

  useEffect(() => {
    getAllTodos()
      .then((todos) => {
        dispatch({ type: 'LOAD_TODOS', payload: todos });
      })
      .catch((err) => {
        console.log(err);
        alert('Could Not fetch todos');
      });
  }, [dispatch]);

  return (
    <>
      <input type="checkbox" id="sidebar_toggle"></input>
      <Sidebar />
      <Main />
    </>
  );
}

export default App;
