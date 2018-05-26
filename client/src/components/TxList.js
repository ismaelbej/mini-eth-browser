import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
} from 'semantic-ui-react';
import {
  formatAddress,
  formatAmount,
  formatHash,
  formatElapsed,
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
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Timestamp</Table.HeaderCell>
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
            {!tx.to && tx.receipt.status !== '0x00' && <Table.Cell>(Created <Link to={`/account/${tx.receipt.contractAddress}`}>{formatAddress(tx.receipt.contractAddress, 12)}</Link>)</Table.Cell>}
            {!tx.to && tx.receipt.status === '0x00' && <Table.Cell>(Creation failed)</Table.Cell>}
            <Table.Cell>{formatAmount(tx.value)}</Table.Cell>
            <Table.Cell>{tx.inputDecoded && tx.inputDecoded.name ? tx.inputDecoded.name : ''}</Table.Cell>
            <Table.Cell>{formatElapsed(tx.block.timestamp)}</Table.Cell>
            <Table.Cell textAlign="right" >{tx.receipt.gasUsed}</Table.Cell>
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
