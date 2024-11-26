import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './html_css/stylesheets/todo.css';
import App from './App.tsx';
import { TodosContextProvider } from './Context.tsx';

createRoot(document.getElementById('root')!).render(
  <TodosContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </TodosContextProvider>
);
