import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <LoginPage />
          </Route>
          <Route exact path='/home'>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
