import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import { NavBar } from './components/NavBar.js';
import { Homepage } from './components/Homepage.js';
import { Register } from './components/Register.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route path= "" element={<Homepage />}></Route>
          <Route path= "/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
