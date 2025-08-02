import React from 'react';
import {
  Button,
  Container,
  Label,
  Loader,
  Icon,
} from 'semantic-ui-react';
import {
  formatElapsed,
  formatAmount,
} from '../utils/formatters';
import { useBlockchainQuery } from '../hooks/useBlockchainQuery';

const BlockchainInfo: React.FC = () => {
  const { data, isLoading, error } = useBlockchainQuery();

  if (isLoading) {
    return (
      <Container style={{ marginTop: '1em' }}>
        <Loader active inline size="tiny" />
      </Container>
    );
  }

  if (error || !data?.blockchain) {
    return (
      <Container style={{ marginTop: '1em' }}>
        <div>Error loading blockchain data</div>
      </Container>
    );
  }

  const { blockchain } = data;

  return (
    <Container style={{ marginTop: '1em' }}>
      <Button as="div" labelPosition="right">
        <Button color="orange">
          <Icon name="cubes" />
          Blocks
        </Button>
        <Label as="a" basic pointing="left">{blockchain.block.number}</Label>
      </Button>
      <Button as="div" labelPosition="right">
        <Button color="orange">
          <Icon name="fire" />
          Gas Price
        </Button>
        <Label as="a" basic pointing="left">{formatAmount(blockchain.gasPrice)}</Label>
      </Button>
      <Button as="div" labelPosition="right">
        <Button color="orange">
          <Icon name="clock" />
          Last block
        </Button>
        <Label as="a" basic pointing="left">{formatElapsed(blockchain.block.timestamp)}</Label>
      </Button>
    </Container>
  );
};

export default BlockchainInfo; 