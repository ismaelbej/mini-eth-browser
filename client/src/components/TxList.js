import React from 'react';
import { Link } from 'react-router-dom';
import {
  formatAddress,
  formatAmount,
  formatHash,
} from '../utils/formatters';

const TxList = (props) => {
  const { txs } = props;
  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Hash</th>
          <th>Block</th>
          <th>Index</th>
          <th>From</th>
          <th>To</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {txs.map(tx => (
          <tr key={tx.hash}>
            <td><Link to={`/tx/${tx.hash}`}>{formatHash(tx.hash)}</Link></td>
            <td><Link to={`/block/${tx.blockHash}`}>{tx.blockNumber}</Link></td>
            <td>{tx.transactionIndex}</td>
            <td><Link to={`/account/${tx.from}`}>{formatAddress(tx.from)}</Link></td>
            {tx.to && <td><Link to={`/account/${tx.to}`}>{formatAddress(tx.to)}</Link></td>}
            {!tx.to && <td>Contract creation</td>}
            <td>{formatAmount(tx.value)}</td>
          </tr>
        ))}
        {txs.length === 0 && <tr>
          <td colSpan="6">No transactions</td>
        </tr>}
      </tbody>
    </table>
  );
};

export default TxList;
