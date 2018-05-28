import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
} from 'semantic-ui-react';

const PrevNext = ({ hasPrev, prev, hasNext, next }) => (
  <Button.Group floated="right">
    <Button
      color="orange"
      disabled={!hasPrev}
      labelPosition="left"
      content="Previous"
      icon="left chevron"
      as={Link}
      to={prev}
    />
    <Button
      color="orange"
      disabled={!hasNext}
      labelPosition="right"
      content="Next"
      icon="right chevron"
      as={Link}
      to={next}
    />
  </Button.Group>
);

export default PrevNext;
