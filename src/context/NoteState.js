import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"
  const noteInitial = []
  const [notes, setnotes] = useState(noteInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "authtoken": localStorage.getItem('Auth_Token')
      }
    });
    const json = await response.json()
    console.log(json);
    setnotes(json)
  }


  //add a note
  const addNote = async (title, description, tag) => {

    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem('Auth_Token')
      },
      body: JSON.stringify({ title, description, tag })
    });


    const note = await response.json();
    setnotes(notes.concat(note))
  }


  //delete a note
  const deleteNote = async (id) => {

    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "authtoken": localStorage.getItem('Auth_Token')
      }
    });
    const json = response.json();
    console.log(json)

    const newNote = notes.filter((note) => { return note._id !== id });
    setnotes(newNote)
  }

  //edit a note
  const editNote = async (id, title, description, tag) => {

    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem('Auth_Token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json =await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
// Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;

      }
    }
    setnotes(newNotes);
  }




  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>

      {props.children}

    </NoteContext.Provider>
  )
}

export default NoteState;
