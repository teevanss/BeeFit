import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Homepage } from './components/Homepage.js';
import { NavBar } from './components/NavBar.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Homepage />
    </div>
  );
}

export default App;
