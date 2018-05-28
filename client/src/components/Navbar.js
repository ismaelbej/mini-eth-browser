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
      <Menu.Item as={Link} to="/"><Icon name="home" color="orange" basic />Home</Menu.Item>
      <Menu.Item as={Link} to="/block"><Icon name="cubes" color="orange" basic />Blocks</Menu.Item>
      <Menu.Item as={Link} to="/tx"><Icon name="content" color="orange" basic />Transactions</Menu.Item>
      <Menu.Item as={Link} to="/contract"><Icon name="signup" color="orange" basic />Contracts</Menu.Item>
    </Menu>
  </Container>
);

export default Navbar;
