import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Menu,
  Icon,
} from 'semantic-ui-react';

const Navbar = () => (
  <Container>
    <Menu icon="labeled">
      <Menu.Item as={Link} to="/"><Icon name="home" color="orange" />Home</Menu.Item>
      <Menu.Item as={Link} to="/block"><Icon name="cubes" color="orange" />Blocks</Menu.Item>
      <Menu.Item as={Link} to="/tx"><Icon name="content" color="orange" />Transactions</Menu.Item>
      <Menu.Item as={Link} to="/contract"><Icon name="signup" color="orange" />Contracts</Menu.Item>
    </Menu>
  </Container>
);

export default Navbar;
