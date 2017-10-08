import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';

const Contract = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column>
        <Header as="h1">Contract</Header>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        Pending..
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Contract;
