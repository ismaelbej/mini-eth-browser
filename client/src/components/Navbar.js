import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Menu,
  Icon,
} from 'semantic-ui-react';

const Navbar = ({ menu }) => (
  <Container>
    <Menu icon="labeled">
      {menu.map(({ path, icon, label }) => (
        <Menu.Item key={label} as={Link} to={path}><Icon name={icon} color="orange" />{label}</Menu.Item>
      ))}
    </Menu>
  </Container>
);

export default Navbar;
