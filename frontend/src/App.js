import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, React } from "react";
import { ThemeContext } from "./ThemeContext";
import { LoginContext } from "./LoginContext";
import { NavBar } from './components/NavBar.js';
import { Homepage } from './components/Homepage.js';
import { Register } from './components/Register.js';
import { Login } from './components/Login.js';
import { ForgotPassword } from './components/ForgotPassword.js';
import { UserHomepage } from './components/UserHomepage.js';
import { Stats } from './components/Stats.js';
import { Journal } from './components/Journal.js';

function App() {

  // Theme is light by default
  const [theme, setTheme] = useState("light");
  
  // False by default
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      setLoggedIn(false);
    }
    else {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <ThemeContext.Provider value={{theme, setTheme}}>
        <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
        <NavBar/>
          <Routes>
            <Route path="" element={<Homepage />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/forgotpassword" element={<ForgotPassword />}/>
            <Route path="/home/:id" element={<UserHomepage />}/>
            <Route path="/stats/:id" element={<Stats />}/>
            <Route path="/journal/:id" element={<Journal />}/>
          </Routes>
          </LoginContext.Provider>
          </ThemeContext.Provider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
