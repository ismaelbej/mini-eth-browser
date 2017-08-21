import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import 'react-skeleton-css/styles/skeleton.2.0.4.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import BlockList from './views/BlockList';
import BlockInfo from './views/BlockInfo';
import TxInfo from './views/TxInfo';
import TxList from './views/TxList';
import Account from './views/Account';
import Contract from './views/Contract';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/block" component={BlockList} />
          <Route exact path="/block/:hash" component={BlockInfo} />
          <Route exact path="/block/:hash/txs" component={TxList} />
          <Route exact path="/tx/:hash" component={TxInfo} />
          <Route exact path="/account/:address" component={Account} />
          <Route path="/contract" component={Contract} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
