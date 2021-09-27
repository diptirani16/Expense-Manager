import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import Stats from './components/Stats';
import { ProtectedRoute } from './components/ProtectedRoute';
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

          <ProtectedRoute exact path='/home' component={HomePage} />
          <ProtectedRoute exact path='/stats' component={Stats} />

          <Route path="*" component={
              () => "404 NOT FOUND"
            } />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
