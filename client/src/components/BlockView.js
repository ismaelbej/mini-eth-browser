import React from 'react';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../utils/formatters';

const BlockView = (props) => {
  const { block } = props;
  return (
    <table>
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
          <td>{block.parentHash}</td>
        </tr>
        <tr>
          <td>Date:</td>
          <td>{formatTimestamp(block.timestamp)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BlockView;
