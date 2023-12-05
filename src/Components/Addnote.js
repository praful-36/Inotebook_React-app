import React, { useContext, useState } from 'react'
import noteContext from "../context/noteContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addnote = (props) => {

  const context = useContext(noteContext)
  const { addNote } = context

  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    notify();
    props.showAlert("successfully Added ","success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }


  const notify = () => toast.success(' successfully Added note!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
});



  return (
    <div className="container my-4 add-N" showAlert={props.showAlert}>
      <h1>ADD YOUR NOTES HERE :-</h1>

      <form className="my-2">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">title</label>
          <input type="title" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">description</label>
          <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required />
        </div>

        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-light" onClick={handleClick} >Add notes</button>
      </form>


      <div>
                <button style={{ "display": "none" }} onClick={notify}>Notify!</button>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>

    </div>
  )
}

export default Addnote