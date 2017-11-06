import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Menu,
} from 'semantic-ui-react';

const Navbar = () => (
  <Container>
    <Menu>
      <Menu.Item as={Link} to="/">Home</Menu.Item>
      <Menu.Item as={Link} to="/block">Blocks</Menu.Item>
      <Menu.Item as={Link} to="/tx">Transactions</Menu.Item>
    </Menu>
  </Container>
);

export default Navbar;
