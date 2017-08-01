import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
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
      <div class="container">
        <Route exact path="/" component={Home} />
        <Route path="/block" component={Block} />
        <Route path="/tx" component={Transaction} />
        <Route path="/account" component={Account} />
        <Route path="/contract" component={Contract} />
      </div>
    </div>
  </Router>
);

export default App;
