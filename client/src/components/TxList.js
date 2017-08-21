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
            <td><Link to={`/tx/${tx.blockHash}`}>{tx.blockNumber}</Link></td>
            <td>{tx.transactionIndex}</td>
            <td><Link to={`/account/${tx.from}`}>{formatAddress(tx.from)}</Link></td>
            <td><Link to={`/account/${tx.to}`}>{formatAddress(tx.to)}</Link></td>
            <td>{formatAmount(tx.value)}</td>
          </tr>
        ))}
        {txs.length === 0 && <tr>
          <td colSpan="5">No transactions</td>
        </tr>}
      </tbody>
    </table>
  );
};

export default TxList;
