import React from 'react';
import {
  Button,
  Container,
  Label,
} from 'semantic-ui-react';
import {
  formatElapsed,
  formatAmount,
} from '../utils/formatters';

const BlockchainInfo = (props) => {
  const { blockchain } = props;
  if (!blockchain) {
    return <div />;
  }
  return (
    <Container style={{ marginTop: '1em' }}>
      <Button as="div" labelPosition="right">
        <Button>
          Blocks
        </Button>
        <Label as="a" basic pointing="left">{blockchain.block.number}</Label>
      </Button>
      <Button as="div" labelPosition="right">
        <Button>
          Gas Price
        </Button>
        <Label as="a" basic pointing="left">{formatAmount(blockchain.gasPrice)}</Label>
      </Button>
      <Button as="div" labelPosition="right">
        <Button>
          Last block
        </Button>
        <Label as="a" basic pointing="left">{formatElapsed(blockchain.block.timestamp)}</Label>
      </Button>
    </Container>
  );
};

export default BlockchainInfo;
