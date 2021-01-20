import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './components/Header/Header'
import Login from './components/Login/Login';
import User from './components/User/User';
import Shop from './components/Shop/Shop';

import './App.css';

function App() {
  
  return (
    <Router>
      <div id="main">
        <div id="header">
          <Header />
        </div>
        <div id="content">
          <Switch >
            <Route exact path="/" component={Shop} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/user/:id" component={User} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
