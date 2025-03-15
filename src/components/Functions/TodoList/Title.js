import "../styles/title.css";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import React,{ useState, useEffect } from "react";
import { collection,query,orderBy,onSnapshot,getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";

function Title() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks,setTasks] = useState([])
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
     try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  /* function to get all tasks from firestore in realtime */
  useEffect(()=>{
    const q = query(collection(db,'tasks'),orderBy('created','desc'));
    onSnapshot(q,(querySnapshot)=>{
      setTasks(querySnapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
      })))
    })
  },[])
  return (
    <div className="title">
      <header>Todo App</header>
       Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
      <div className="title__container">
        <button onClick={() => setOpenAddModal(true)}>New Task +</button>
        <div className="title">
          {tasks.map((todo)=>(
            <TodoList
              id={todo.id}
              key={todo.id}
              completed={todo.data.completed}
              title={todo.data.title}
              description={todo.data.description}
              />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddTodo onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
}

export default Title;