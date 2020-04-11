import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
} from 'semantic-ui-react';
import { formatAmount } from '../utils/formatters';

const Account = ({
  address, balance, transactionCount, isContract,
}) => (
  <Table>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Address:</Table.Cell>
        <Table.Cell>{address}</Table.Cell>
      </Table.Row>
      {isContract && (
      <Table.Row>
        <Table.Cell>Contract:</Table.Cell>
        <Table.Cell><Link to={`/contract/${address}`}>{address}</Link></Table.Cell>
      </Table.Row>
      )}
      <Table.Row>
        <Table.Cell>Balance:</Table.Cell>
        <Table.Cell>{formatAmount(balance)}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Num. Transactions:</Table.Cell>
        <Table.Cell>{transactionCount}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default Account;
