import './App.css';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from "./context/NoteState";
import Alert from './Components/Alert';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Addnote from './Components/Addnote';
import { useState } from 'react';

function App() {

 const mystyle = {
    backgroundColor:"rgb(50 58 66 / 66%)",
    borderRadius:"23px",
    color:"white",
    width:"38rem"
  }
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}


  return (
    <>
    <NoteState>

    <Router>
        <Navbar />
        <Alert alert={alert}/>

        <div className="container p-3 my-4 container-u" style={mystyle}>
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/Addnote" element={<Addnote />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Signup" element={<Signup showAlert={showAlert}  />} />
          <Route exact path="/Login" element={<Login showAlert={showAlert} />} />

        </Routes>
        </div>

      </Router>

      </NoteState>
    </>
  );
}

export default App;