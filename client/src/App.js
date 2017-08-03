import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import 'react-skeleton-css/styles/skeleton.2.0.4.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Block from './views/Block';
import Transaction from './views/Transaction';
import Account from './views/Account';
import Contract from './views/Contract';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/block" component={Block} />
          <Route path="/tx" component={Transaction} />
          <Route path="/account" component={Account} />
          <Route path="/contract" component={Contract} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
