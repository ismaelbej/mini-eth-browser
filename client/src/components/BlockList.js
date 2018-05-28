import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
} from 'semantic-ui-react';
import {
  formatAddress,
  formatHash,
  formatElapsed,
} from '../utils/formatters';

const BlockList = (props) => {
  const { blocks } = props;
  return (
    <Table striped fixed singleLine color="orange">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Hash</Table.HeaderCell>
          <Table.HeaderCell>Block</Table.HeaderCell>
          <Table.HeaderCell># Trans.</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Miner</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {blocks.map(block => (
          <Table.Row key={block.hash}>
            <Table.Cell><Link to={`/block/${block.hash}`}>{formatHash(block.hash)}</Link></Table.Cell>
            <Table.Cell><Link to={`/block/${block.hash}`}>{block.number}</Link></Table.Cell>
            <Table.Cell><Link to={`/block/${block.hash}/txs`}>{block.transactions.length}</Link></Table.Cell>
            <Table.Cell>{formatElapsed(block.timestamp)}</Table.Cell>
            <Table.Cell><Link to={`/account/${block.miner}`}>{formatAddress(block.miner)}</Link></Table.Cell>
          </Table.Row>
        ))}
        {blocks.length === 0 && <Table.Row>
          <Table.Cell colSpan="5">No blocks</Table.Cell>
        </Table.Row>}
      </Table.Body>
    </Table>
  );
};

export default BlockList;
