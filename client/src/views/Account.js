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
import { getAccountInfo } from '../lib/api';

function Account() {
  const [account, setAccount] = useState(null);
  const { address } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAccountInfo(address);
        setAccount(data);
      } catch (ex) {
        console.error('Error fetching account:', ex);
      }
    }

    fetchData();
  }, [address]);

  if (!account) {
    return (
      <Container>
        <Loader active inline size="tiny" />
      </Container>
    );
  }

  return (
    <Container>
      <Header as="h2">Account: {formatHash(account.address)}</Header>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Balance</Table.Cell>
            <Table.Cell>{formatAmount(account.balance)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Nonce</Table.Cell>
            <Table.Cell>{account.nonce}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}

export default Account;
