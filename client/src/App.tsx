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
import { QueryProvider } from './providers/QueryProvider';
import { BlockchainProvider } from './context/BlockchainContext';
import Navbar from './components/Navbar';
import BlockchainInfo from './components/BlockchainInfo';
import Home from './views/Home';
import BlockList from './views/BlockList';
import BlockInfo from './views/BlockInfo';
import BlockTxList from './views/BlockTxList';
import TxInfo from './views/TxInfo';
import Account from './views/Account';
import Contract from './views/Contract';

const menu = [
  { path: "/", icon: "home", label: "Home" },
  { path: "/block", icon: "cubes", label: "Blocks" },
  // { path: "/tx", icon: "content", label: "Transactions" },
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
  <QueryProvider>
    <BlockchainProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/block" element={<BlockList />} />
            <Route path="/block/:hash" element={<BlockInfo />} />
            <Route path="/block/:hash/txs" element={<BlockTxList />} />
            {/* <Route path="/tx/" element={<TxList />} /> */}
            <Route path="/tx/:hash" element={<TxInfo />} />
            <Route path="/account/:address" element={<Account />} />
            <Route path="/contract" element={<Contract />} />
          </Route>
        </Routes>
      </Router>
    </BlockchainProvider>
  </QueryProvider>
);

export default App; 