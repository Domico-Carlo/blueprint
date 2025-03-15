import Modal from "./Modal"
import {useState} from 'react'
import '../styles/addTodo.css'
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { firebase_db } from "../firebase"

function AddTodo({onClose, open}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [datetime, setDatetime] = useState('')
  
  /* function to add new task to firestore */
  const handleSubmit = async (e) => { 
    e.preventDefault()
    try { 
      await addDoc(collection(firebase_db,'tasks'),{
        title:title,
        description:description,
        location:location,
        datetime:datetime,
        completed:false,
        created: Timestamp.now()
      })
      onClose()
    }catch (err) {
      alert(err)
    }
  }
  return (
    <Modal modalLable='Add Todo' onClose={onClose} open={open}>
      <form className='addTodo'onSubmit={handleSubmit} name='addTodo'>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Enter title'/>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
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
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTodo