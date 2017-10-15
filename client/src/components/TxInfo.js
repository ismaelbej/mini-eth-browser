import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
} from 'semantic-ui-react';
import {
  formatTimestamp,
  formatAmount,
} from '../utils/formatters';

const NULL_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';

const TxInfo = (props) => {
  const { tx } = props;
  if (!tx) {
    return <div />;
  }
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Hash:</Table.Cell>
          <Table.Cell>{tx.hash}</Table.Cell>
        </Table.Row>
        {tx.blockHash !== NULL_HASH && <Table.Row>
          <Table.Cell>Block Hash:</Table.Cell>
          <Table.Cell><Link to={`/block/${tx.blockHash}`}>{tx.blockHash}</Link></Table.Cell>
        </Table.Row>}
        {tx.blockHash !== NULL_HASH && <Table.Row>
          <Table.Cell>Block Number:</Table.Cell>
          <Table.Cell><Link to={`/block/${tx.blockHash}`}>{tx.blockNumber}</Link></Table.Cell>
        </Table.Row>}
        {tx.blockHash !== NULL_HASH && <Table.Row>
          <Table.Cell>Transaction Index:</Table.Cell>
          <Table.Cell>{tx.transactionIndex}</Table.Cell>
        </Table.Row>}
        {tx.block && <Table.Row>
          <Table.Cell>Date:</Table.Cell>
          <Table.Cell>{formatTimestamp(tx.block.timestamp)}</Table.Cell>
        </Table.Row>}
        {tx.blockHash === NULL_HASH && <Table.Row>
          <Table.Cell>Block:</Table.Cell>
          <Table.Cell>Pending</Table.Cell>
        </Table.Row>}
        <Table.Row>
          <Table.Cell>From:</Table.Cell>
          <Table.Cell><Link to={`/account/${tx.from}`}>{tx.from}</Link></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>To:</Table.Cell>
          {tx.to && <Table.Cell><Link to={`/account/${tx.to}`}>{tx.to}</Link></Table.Cell>}
          {!tx.to && tx.receipt.contractAddress && <Table.Cell>Contract created <Link to={`/contract/${tx.receipt.contractAddress}`}>{tx.receipt.contractAddress}</Link></Table.Cell>}
          {!tx.to && !tx.receipt.contractAddress && <Table.Cell>Contract creation faild</Table.Cell>}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Gas:</Table.Cell>
          <Table.Cell>{tx.gas}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Gas Price:</Table.Cell>
          <Table.Cell>{formatAmount(tx.gasPrice)}</Table.Cell>
        </Table.Row>
        {tx.receipt && <Table.Row>
          <Table.Cell>Gas Used:</Table.Cell>
          <Table.Cell>{tx.receipt.gasUsed}</Table.Cell>
        </Table.Row>}
        <Table.Row>
          <Table.Cell>Nonce:</Table.Cell>
          <Table.Cell>{tx.nonce}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Value:</Table.Cell>
          <Table.Cell>{formatAmount(tx.value)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Input:</Table.Cell>
          <Table.Cell>{tx.input}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default TxInfo;
