import React from 'react';
import {
  Table,
} from 'semantic-ui-react';
import {
  formatTimestamp,
  formatAmount,
} from '../utils/formatters';

const BlockInfo = (props) => {
  const { blockchain } = props;
  if (!blockchain) {
    return <div />;
  }
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Latest block:</Table.Cell>
          <Table.Cell>{blockchain.block.number}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Date:</Table.Cell>
          <Table.Cell>{formatTimestamp(blockchain.block.timestamp)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Gas price:</Table.Cell>
          <Table.Cell>{formatAmount(blockchain.gasPrice)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Mining:</Table.Cell>
          <Table.Cell>{blockchain.mining ? 'yes' : 'no'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Hashrate:</Table.Cell>
          <Table.Cell>{blockchain.hashrate}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Coinbase:</Table.Cell>
          <Table.Cell>{blockchain.coinbase}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default BlockInfo;
