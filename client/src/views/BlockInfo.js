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
  formatElapsed,
} from '../utils/formatters';
import { getBlockInfo } from '../lib/api';

function BlockInfo() {
  const [block, setBlock] = useState(null);
  const { hash } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBlockInfo(hash);
        setBlock(data);
      } catch (ex) {
        console.error('Error fetching block:', ex);
      }
    }

    fetchData();
  }, [hash]);

  if (!block) {
    return (
      <Container>
        <Loader active inline size="tiny" />
      </Container>
    );
  }

  return (
    <Container>
      <Header as="h2">Block: {formatHash(block.hash)}</Header>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Number</Table.Cell>
            <Table.Cell>{block.number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Timestamp</Table.Cell>
            <Table.Cell>{formatElapsed(block.timestamp)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Gas Used</Table.Cell>
            <Table.Cell>{formatAmount(block.gasUsed)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Gas Limit</Table.Cell>
            <Table.Cell>{formatAmount(block.gasLimit)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Miner</Table.Cell>
            <Table.Cell>{formatHash(block.miner)}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}

export default BlockInfo;
