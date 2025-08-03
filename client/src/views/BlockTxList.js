import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Table,
  Loader,
  Pagination,
} from 'semantic-ui-react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  formatHash,
  formatAmount,
} from '../utils/formatters';
import { getBlockTransactionList } from '../lib/api';

function BlockTxList() {
  const [transactions, setTransactions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { hash } = useParams();

  const start = parseInt(searchParams.get('start') || '0');
  const count = parseInt(searchParams.get('count') || '20');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBlockTransactionList(hash, start, count);
        setTransactions(data.transactions || []);
      } catch (ex) {
        console.error('Error fetching transactions:', ex);
      }
    }

    fetchData();
  }, [hash, start, count]);

  const handlePageChange = (e, { activePage }) => {
    const newStart = (activePage - 1) * count;
    setSearchParams({ start: newStart.toString(), count: count.toString() });
  };

  if (transactions.length === 0) {
    return (
      <Container>
        <Loader active inline size="tiny" />
      </Container>
    );
  }

  return (
    <Container>
      <Header as="h2">Block Transactions</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Hash</Table.HeaderCell>
            <Table.HeaderCell>From</Table.HeaderCell>
            <Table.HeaderCell>To</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
            <Table.HeaderCell>Gas</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactions.map((tx) => (
            <Table.Row key={tx.hash}>
              <Table.Cell>{formatHash(tx.hash)}</Table.Cell>
              <Table.Cell>{formatHash(tx.from)}</Table.Cell>
              <Table.Cell>{formatHash(tx.to)}</Table.Cell>
              <Table.Cell>{formatAmount(tx.value)}</Table.Cell>
              <Table.Cell>{formatAmount(tx.gas)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        activePage={Math.floor(start / count) + 1}
        totalPages={Math.ceil(transactions.length / count)}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

export default BlockTxList;
