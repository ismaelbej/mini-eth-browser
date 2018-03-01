import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
} from 'semantic-ui-react';
import {
  formatAddress,
  formatAmount,
  formatHash,
} from '../utils/formatters';

const TxList = (props) => {
  const { txs } = props;
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Hash</Table.HeaderCell>
          <Table.HeaderCell>Block</Table.HeaderCell>
          <Table.HeaderCell>Index</Table.HeaderCell>
          <Table.HeaderCell>From</Table.HeaderCell>
          <Table.HeaderCell>To</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Gas</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {txs.map(tx => (
          <Table.Row key={tx.hash}>
            <Table.Cell><Link to={`/tx/${tx.hash}`}>{formatHash(tx.hash)}</Link></Table.Cell>
            <Table.Cell><Link to={`/block/${tx.blockHash}`}>{tx.blockNumber}</Link></Table.Cell>
            <Table.Cell>{tx.transactionIndex}</Table.Cell>
            <Table.Cell><Link to={`/account/${tx.from}`}>{formatAddress(tx.from)}</Link></Table.Cell>
            {tx.to && <Table.Cell><Link to={`/account/${tx.to}`}>{formatAddress(tx.to)}</Link></Table.Cell>}
            {!tx.to && <Table.Cell>Contract creation</Table.Cell>}
            <Table.Cell>{formatAmount(tx.value)}</Table.Cell>
            <Table.Cell>{tx.receipt.gasUsed}</Table.Cell>
          </Table.Row>
        ))}
        {txs.length === 0 && <Table.Row>
          <Table.Cell colSpan="6">No transactions</Table.Cell>
        </Table.Row>}
      </Table.Body>
    </Table>
  );
};

export default TxList;
