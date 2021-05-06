import { Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'

import './App.css';

function App() {
  return (
    <div className="App">

      <div className="headerStyle">
        <h1>Sweetaholics</h1>

        <NavBar /><br/><br/>
      </div>

      <Route
        path="/"
        exact
        render={() => {
          return <Home />
        }}
      />

      <Route 
        path="/login"
        render={() => {
          return <Login />
        }}
      />

      <Route 
        path="/signup"
        render={() => {
          return <Signup />
        }}
      />

    </div>
  );
}

export default App;
