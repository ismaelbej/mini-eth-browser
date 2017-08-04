import React from 'react';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../utils/formatters';

const BlockInfo = (props) => {
  const { block } = props;
  return (
    <table className="u-full-width">
      <tbody>
        <tr>
          <td>Hash:</td>
          <td>{block.hash}</td>
        </tr>
        <tr>
          <td>Number:</td>
          <td>{block.number}</td>
        </tr>
        <tr>
          <td>Parent:</td>
          <td><Link to={`/block/${block.parentHash}`}>{block.parentHash}</Link></td>
        </tr>
        <tr>
          <td>Date:</td>
          <td>{formatTimestamp(block.timestamp)}</td>
        </tr>
        <tr>
          <td>Nonce:</td>
          <td>{block.nonce}</td>
        </tr>
        <tr>
          <td>Miner:</td>
          <td><Link to={`/account/${block.miner}`}>{block.miner}</Link></td>
        </tr>
        <tr>
          <td>Difficulty:</td>
          <td>{block.difficulty}</td>
        </tr>
        <tr>
          <td>Total Difficulty:</td>
          <td>{block.totalDifficulty}</td>
        </tr>
        <tr>
          <td>Gas Limit:</td>
          <td>{block.gasLimit}</td>
        </tr>
        <tr>
          <td>Gas Used:</td>
          <td>{block.gasUsed}</td>
        </tr>
        <tr>
          <td>Size:</td>
          <td>{block.size}</td>
        </tr>
        <tr>
          <td>Num. Transactions:</td>
          <td>{block.transactions.length}</td>
        </tr>
        <tr>
          <td>Num. Uncles:</td>
          <td>{block.uncles.length}</td>
        </tr>
        <tr>
          <td>Extra data:</td>
          <td>{block.extraData}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BlockInfo;
