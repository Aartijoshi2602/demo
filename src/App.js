import './App.css';
import Login from './Components/Login';
import { Signup } from './Components/Signup';
import Contact from './Components/Contact';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Protect from './Components/Protect';
import About from './Components/About';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"><Login /></Route>
          <Route path="/signup"><Signup /></Route>
          <Route path="/contact"><Protect><Contact /></Protect></Route>
          <Route path="/about"><Protect><About /></Protect></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
