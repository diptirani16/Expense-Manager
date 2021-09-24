import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import LineChart from './components/graphs/LineChart';
import PieChart from './components/graphs/PieChart';
import BarChart from './components/graphs/BarChart';
import Stats from './components/Stats';
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
          <Route exact path='/stats'>
            <Stats />
          </Route>
          <Route exact path='/stats/linechart'>
            <LineChart />
          </Route>
          <Route exact path='/stats/piechart'>
            <PieChart />
          </Route>
          <Route exact path='/stats/barchart'>
            <BarChart />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
