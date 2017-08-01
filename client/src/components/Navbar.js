import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav class="navbar">
    <div class="container">
      <ul class="navbar-list">
        <li class="navbar-item" >
          <Link to="/block">Blocks</Link>
        </li>
        <li class="navbar-item" >
          <Link to="/tx">Transactions</Link>
        </li>
        <li class="navbar-item" >
          <Link to="/account">Accounts</Link>
        </li>
        <li class="navbar-item" >
          <Link to="/contract">Contracts</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
