import Modal from "./Modal";
import "../styles/todo.css";

function Todo({ onClose, open, title, description }) {
  return (
    <Modal modalLable="Todo" onClose={onClose} open={open}>
      <div className="todo">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{location}</p>
        <p>{datetime}</p>
      </div>
    </Modal>
  );
}

export default Todo;