import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Table,
  Loader,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import {
  formatHash,
  formatAmount,
} from '../utils/formatters';
import { getTransactionInfo } from '../lib/api';

function TxInfo() {
  const [transaction, setTransaction] = useState(null);
  const { hash } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTransactionInfo(hash);
        setTransaction(data);
      } catch (ex) {
        console.error('Error fetching transaction:', ex);
      }
    }

    fetchData();
  }, [hash]);

  if (!transaction) {
    return (
      <Container>
        <Loader active inline size="tiny" />
      </Container>
    );
  }

  return (
    <Container>
      <Header as="h2">Transaction: {formatHash(transaction.hash)}</Header>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>From</Table.Cell>
            <Table.Cell>{formatHash(transaction.from)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>To</Table.Cell>
            <Table.Cell>{formatHash(transaction.to)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Value</Table.Cell>
            <Table.Cell>{formatAmount(transaction.value)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Gas</Table.Cell>
            <Table.Cell>{formatAmount(transaction.gas)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Gas Price</Table.Cell>
            <Table.Cell>{formatAmount(transaction.gasPrice)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Nonce</Table.Cell>
            <Table.Cell>{transaction.nonce}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}

export default TxInfo;
