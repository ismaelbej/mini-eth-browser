import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <ul className="navbar-list">
        <li className="navbar-item" >
          <Link to="/block">Blocks</Link>
        </li>
        <li className="navbar-item" >
          <Link to="/tx">Transactions</Link>
        </li>
        <li className="navbar-item" >
          <Link to="/account">Accounts</Link>
        </li>
        <li className="navbar-item" >
          <Link to="/contract">Contracts</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
