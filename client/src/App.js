import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import {
  Container,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Navbar from './components/Navbar';
import BlockchainInfo from './views/BlockchainInfo';
import Home from './views/Home';
import BlockList from './views/BlockList';
import BlockInfo from './views/BlockInfo';
import BlockTxList from './views/BlockTxList';
import TxInfo from './views/TxInfo';
import TxList from './views/TxList';
import Account from './views/Account';
import Contract from './views/Contract';

const menu = [
  { path: "/", icon: "home", label: "Home" },
  { path: "/block", icon: "cubes", label: "Blocks" },
  { path: "/tx", icon: "content", label: "Transactions" },
  { path: "/contract", icon: "signup", label: "Contracts" },
];

const Layout = () => (
  <Container>
    <Navbar menu={menu} />
    <BlockchainInfo />
    <Container style={{ marginTop: '1em' }}>
      <Outlet />
    </Container>
  </Container>
);

const App = () => (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/block" element={<BlockList />} />
        <Route exact path="/block/:hash" element={<BlockInfo />} />
        <Route exact path="/block/:hash/txs" element={<BlockTxList />} />
        <Route exact path="/tx/" element={<TxList />} />
        <Route exact path="/tx/:hash" element={<TxInfo />} />
        <Route exact path="/account/:address" element={<Account />} />
        <Route path="/contract" element={<Contract />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
