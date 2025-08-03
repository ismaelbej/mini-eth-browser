import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Table,
  Loader,
} from 'semantic-ui-react';
import {
  formatHash,
  formatAmount,
  formatElapsed,
} from '../utils/formatters';
import { getBlockList } from '../lib/api';

function Home() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBlockList(0, 10);
        setBlocks(data.blocks || []);
      } catch (ex) {
        console.error('Error fetching blocks:', ex);
      }
    }

    fetchData();
  }, []);

  if (blocks.length === 0) {
    return (
      <Container>
        <Loader active inline size="tiny" />
      </Container>
    );
  }

  return (
    <Container>
      <Header as="h2">Recent Blocks</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Number</Table.HeaderCell>
            <Table.HeaderCell>Hash</Table.HeaderCell>
            <Table.HeaderCell>Timestamp</Table.HeaderCell>
            <Table.HeaderCell>Transactions</Table.HeaderCell>
            <Table.HeaderCell>Gas Used</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {blocks.map((block) => (
            <Table.Row key={block.hash}>
              <Table.Cell>{block.number}</Table.Cell>
              <Table.Cell>{formatHash(block.hash)}</Table.Cell>
              <Table.Cell>{formatElapsed(block.timestamp)}</Table.Cell>
              <Table.Cell>{block.transactions}</Table.Cell>
              <Table.Cell>{formatAmount(block.gasUsed)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}

export default Home;
