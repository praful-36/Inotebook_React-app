import React, { useContext } from 'react'
// import { useNavigate,} from 'react-router-dom';
import noteContext from "../context/noteContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Noteitems = (props) => {

    const context = useContext(noteContext)
    const {deleteNote} = context;
    const { note,updateNote } = props;
    // const navigate = useNavigate()

    const notify = () => toast.success(' successfully Deleted!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    
   
    // const handleAddClick = () => {
    //  navigate("./Addnote");
    // }

    return (
        <div className='col-md-3 w-50 p-3 width-100'>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <h5 className="card-title" style={{"textTransform":"capitalize"}}>{note.title}</h5>

                    <div className="d-flex">
                    <i className="fa-regular fa-trash-can mx-2"  onClick={
                        ()=>{
                         deleteNote(note._id);
                         notify();
                         props.showAlert("successfully Deleted ","success")
                        }
                         }></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>

                    {/* <i className="fa-solid fa-plus"onClick={handleAddClick} ></i> */}
                    </div>

                    </div>

                    <p className="card-text" style={{"textTransform":"capitalize"}}>{note.description}</p>

                    <span className="badge text-bg-dark " style={{"fontSize":"15px","textTransform":"capitalize"}}  > {note.tag}</span>
                </div>

            </div>

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

export default Noteitems