import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import { useState, React } from "react";
import { NavBar } from './components/NavBar.js';
import { Homepage } from './components/Homepage.js';
import { Register } from './components/Register.js';
import { Login } from './components/Login.js';
import { ForgotPassword } from './components/ForgotPassword.js';
import { MyContext } from "./MyContext";

function App() {

  const [activeLink, setActiveLink] = useState("home");

  return (
    <div className="App">
      <Router>
        <MyContext.Provider value={{ activeLink, setActiveLink }}>
        <NavBar />
          <Routes>
            <Route path= "" element={<Homepage />}/>
            <Route path= "/register" element={<Register />}/>
            <Route path= "/login" element={<Login />}/>
            <Route path= "/forgotpassword" element={<ForgotPassword />}/>
          </Routes>
          </MyContext.Provider>
      </Router>
    </div>
  );
}

export default App;
