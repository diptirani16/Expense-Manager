import './App.css';
// import LoginPage from './components/LoginPage';
// import HomePage from './components/HomePage';
// import Stats from './components/Stats';
import { ProtectedRoute } from './components/ProtectedRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React, { Suspense } from 'react';

const LoginPage = React.lazy(() => import('./components/LoginPage'))
const HomePage = React.lazy(() => import('./components/HomePage'))
const Stats = React.lazy(() => import('./components/Stats'))

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
          <Route exact path='/'>
            <LoginPage />
          </Route>

          <ProtectedRoute exact path='/home' component={HomePage} />
          <ProtectedRoute exact path='/stats' component={Stats} />

          {/* <Route path="*" component={
              () => "404 NOT FOUND"
            } /> */}
            </Suspense>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
