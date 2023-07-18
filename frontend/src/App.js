import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, React } from "react";
import { MyContext } from "./MyContext";
import { NavBar } from './components/NavBar.js';
import { Homepage } from './components/Homepage.js';
import { Register } from './components/Register.js';
import { Login } from './components/Login.js';
import { ForgotPassword } from './components/ForgotPassword.js';
import { UserHomepage } from './components/UserHomepage.js';

function App() {

  // Theme is light by default
  const [theme, setTheme] = useState("light");
  
  return (
    <div className="App">
      <Router>
        <MyContext.Provider value={{theme, setTheme}}>
        <NavBar/>
          <Routes>
            <Route path="" element={<Homepage />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/forgotpassword" element={<ForgotPassword />}/>
            <Route path="/userhomepage" element={<UserHomepage />}/>
          </Routes>
          </MyContext.Provider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
