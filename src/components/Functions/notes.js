// src/components/Notes.js
import React, { useState, useEffect } from "react";
import { firebase_db } from "../../firebase/FirebaseConfig"; // Adjust the import path as needed
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { EditorRoot, EditorContent, useEditor } from "novel";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");

  // Fetch notes from Firestore
  useEffect(() => {
    const q = query(collection(firebase_db, "notes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Add a new note to Firestore
  const addNote = async () => {
    if (newNoteTitle.trim() === "" || editorContent.trim() === "") return;

    await addDoc(collection(firebase_db, "notes"), {
      title: newNoteTitle,
      content: editorContent,
      createdAt: new Date(),
    });

    setNewNoteTitle("");
    setEditorContent("");
  };

  // Initialize the Novel editor
  const editor = useEditor({
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  return (
    <div className="notes-container">
      <h1>AI-Powered Notes</h1>
      <div className="new-note">
        <input
          type="text"
          placeholder="Note Title (e.g., Block Chain Lectorial 1)"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          required
        />
        <EditorRoot editor={editor}>
          <EditorContent />
        </EditorRoot>
        <button onClick={addNote}>Save Note</button>
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note">
            <h2>{note.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
            <small>{new Date(note.createdAt?.toDate()).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;