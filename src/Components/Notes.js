import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/noteContext";
import Noteitems from "./Noteitems";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {

    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;
    const Navigate =useNavigate();

    useEffect(() => {
        if(localStorage.getItem('Auth_Token')){
            getNotes();

        }
        else{
            Navigate("/login")
        }
        // eslint-disable-next-line
    }, [])


    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
       
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        notify();
        props.showAlert("successfully Updated ","success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    const notify = () => toast.success(' successfully Updated note!', {
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
        <>

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

            

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ "color": "black","left": "5%" ,"width": "90%" ,"top": "15%" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container row my-4 My-N">
                <h1>YOUR NOTES ARE HERE :-</h1>

                <div className="container" style={{ "fontSize": "20px" }}>
                    {notes.length === 0 && 'No Notes to Display'}
                </div>


                {
                    notes.map((note) => {
                        return <Noteitems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes