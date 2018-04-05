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
      <Menu.Item as={Link} to="/"><Icon name="home" />Home</Menu.Item>
      <Menu.Item as={Link} to="/block"><Icon name="cubes" />Blocks</Menu.Item>
      <Menu.Item as={Link} to="/tx"><Icon name="content" />Transactions</Menu.Item>
    </Menu>
  </Container>
);

export default Navbar;
