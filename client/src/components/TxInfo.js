import React from 'react';
import { Link } from 'react-router-dom';
import {
  Tab,
  Table,
  TextArea,
} from 'semantic-ui-react';
import {
  formatTimestamp,
  formatAmount,
} from '../utils/formatters';

const NULL_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';

const InfoTab = (props) => {
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
          {!tx.to && tx.receipt.contractAddress &&
            <Table.Cell>Contract created <Link to={`/account/${tx.receipt.contractAddress}`}>{tx.receipt.contractAddress}</Link></Table.Cell>}
          {!tx.to && !tx.receipt.contractAddress &&
            <Table.Cell>Contract creation failed</Table.Cell>}
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
          <Table.Cell>
            <TextArea rows={6} value={tx.input} style={{ minWidth: '450px' }} />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

const ReceiptTab = (props) => {
  const { tx: { receipt } = {} } = props;
  if (!receipt) {
    return <div />;
  }
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Hash:</Table.Cell>
          <Table.Cell>{receipt.transactionHash}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Block Hash:</Table.Cell>
          <Table.Cell><Link to={`/block/${receipt.blockHash}`}>{receipt.blockHash}</Link></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Block Number:</Table.Cell>
          <Table.Cell><Link to={`/block/${receipt.blockHash}`}>{receipt.blockNumber}</Link></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Transaction Index:</Table.Cell>
          <Table.Cell>{receipt.transactionIndex}</Table.Cell>
        </Table.Row>
        {/* <Table.Row>
          <Table.Cell>From:</Table.Cell>
          <Table.Cell><Link to={`/account/${receipt.from}`}>{receipt.from}</Link></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>To:</Table.Cell>
          {receipt.to && <Table.Cell><Link to={`/account/${receipt.to}`}>{receipt.to}</Link></Table.Cell>}
          {!receipt.to && <Table.Cell>Contract creation</Table.Cell>}
        </Table.Row> */}
        {receipt.contractAddress && <Table.Row>
          <Table.Cell>Contract Address:</Table.Cell>
          <Table.Cell><Link to={`/contract/${receipt.contractAddress}`}>{receipt.contractAddress}</Link></Table.Cell>
        </Table.Row>}
        {receipt.status && <Table.Row>
          <Table.Cell>Status:</Table.Cell>
          {receipt.status === 1 && <Table.Cell>Succeeded</Table.Cell>}
          {receipt.status === 0 && <Table.Cell>Failed</Table.Cell>}
        </Table.Row>}
        <Table.Row>
          <Table.Cell>Cumulative Gas Used:</Table.Cell>
          <Table.Cell>{receipt.cumulativeGasUsed}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Gas Used:</Table.Cell>
          <Table.Cell>{receipt.gasUsed}</Table.Cell>
        </Table.Row>
        {receipt.logs.map((log, idx) => (
          <Table.Row key={log.id}>
            {idx === 0 && <Table.Cell rowSpan={`${receipt.logs.length}`}>Logs:</Table.Cell>}
            <Table.Cell>
              <p>Topics:</p>
              {log.topics.map(topic => (
                <p>{topic}</p>
              ))}
              <p>Data:</p>
              <TextArea autoHeight value={log.data} style={{ minWidth: '450px' }} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const TxInfo = (props) => {
  const panes = [
    { menuItem: 'Transaction', render: () => <InfoTab {...props} /> },
    { menuItem: 'Receipt', render: () => <ReceiptTab {...props} /> },
  ];
  return (
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  );
};

export default TxInfo;
