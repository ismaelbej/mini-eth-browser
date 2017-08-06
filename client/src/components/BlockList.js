import React from 'react';
import { Link } from 'react-router-dom';
import {
  formatAddress,
  formatHash,
  formatTimestamp
} from '../utils/formatters';

const BlockList = (props) => {
  const { blocks } = props;
  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Hash</th>
          <th>Block</th>
          <th>Num. Transactions</th>
          <th>Date</th>
          <th>Miner</th>
        </tr>
      </thead>
      <tbody>
      {blocks.map(block => (
        <tr key={block.hash}>
          <td><Link to={`/block/${block.hash}`}>{formatHash(block.hash)}</Link></td>
          <td><Link to={`/block/${block.hash}`}>{block.number}</Link></td>
          <td>{block.transactions.length}</td>
          <td>{formatTimestamp(block.timestamp)}</td>
          <td><Link to={`/account/${block.miner}`}>{formatAddress(block.miner)}</Link></td>
        </tr>
      ))}
      {blocks.length === 0 && <tr>
          <td colSpan="5">No blocks</td>
        </tr>}
      </tbody>
    </table>
  );
};

export default BlockList;
