import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
} from 'semantic-ui-react';
import {
  formatText,
  formatTimestamp,
} from '../utils/formatters';

const BlockInfo = (props) => {
  const { block } = props;
  if (!block) {
    return <div />;
  }
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Hash:</Table.Cell>
          <Table.Cell>{block.hash}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Number:</Table.Cell>
          <Table.Cell>{block.number}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Parent:</Table.Cell>
          <Table.Cell><Link to={`/block/${block.parentHash}`}>{block.parentHash}</Link></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Date:</Table.Cell>
          <Table.Cell>{formatTimestamp(block.timestamp)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Nonce:</Table.Cell>
          <Table.Cell>{block.nonce}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Miner:</Table.Cell>
          <Table.Cell><Link to={`/account/${block.miner}`}>{block.miner}</Link></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Difficulty:</Table.Cell>
          <Table.Cell>{block.difficulty}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Total Difficulty:</Table.Cell>
          <Table.Cell>{block.totalDifficulty}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Gas Limit:</Table.Cell>
          <Table.Cell>{block.gasLimit}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Gas Used:</Table.Cell>
          <Table.Cell>{block.gasUsed}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Size:</Table.Cell>
          <Table.Cell>{block.size}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Num. Transactions:</Table.Cell>
          {block.transactions.length === 0 && <Table.Cell>
            {block.transactions.length}
          </Table.Cell>}
          {block.transactions.length > 0 && <Table.Cell>
            <Link to={`/block/${block.hash}/txs`}>{block.transactions.length}</Link>
          </Table.Cell>}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Num. Uncles:</Table.Cell>
          <Table.Cell>{block.uncles.length}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Extra data:</Table.Cell>
          <Table.Cell>{`${block.extraData} (${formatText(block.extraData)})`}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default BlockInfo;
