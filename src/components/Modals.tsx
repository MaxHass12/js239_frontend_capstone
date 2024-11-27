import { useTodosDispatch, useTodosState } from '../Context';
import TodoForm from './TodoForm';

const Modals = () => {
  const state = useTodosState();
  const todosDispatch = useTodosDispatch();
  const isFormModalVisible = state.isFormModalVisible;

  const modalLayerStyle = state.isFormModalVisible ? { display: 'block' } : {};
  const formModalStyle = state.isFormModalVisible
    ? { display: 'block', top: '200px' }
    : {};

  const handleModalLayerClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    todosDispatch({ type: 'CLOSE_FORM_MODAL' });
  };

  return (
    <>
      {isFormModalVisible && (
        <div
          className="modal"
          id="modal_layer"
          style={modalLayerStyle}
          onClick={handleModalLayerClick}
        ></div>
      )}
      {isFormModalVisible && (
        <div className="modal" id="form_modal" style={formModalStyle}>
          <TodoForm />
        </div>
      )}
    </>
  );
};

export default Modals;
