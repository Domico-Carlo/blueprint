import Modal from "./Modal";
import { useState } from "react";
import "../styles/editTodo.css";

function EditTodo({ open, onClose, toEditTitle, toEditDescription, id }) {
  const [title, setTitle] = useState(toEditTitle);
  const [description, setDescription] = useState(toEditDescription);
  const [location, setLocation] = useState('')
  const [datetime, setDatetime] = useState('')
  /* function to update document in firestore */

  return (
    <Modal modalLable="Edit Todo" onClose={onClose} open={open}>
      <form className="editTodo" name="updateTodo">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <input
          type='text'
          name='location'
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder='Enter location'/>
        <input
          type='datetime-local'
          name='date'
          onChange={(e) => setDatetime(e.target.value)}
          value={datetime}
          placeholder='Enter date'/>
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTodo;