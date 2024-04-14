import React, { useEffect, useState } from 'react';
import {
  Grid,
  Header,
  Loader,
  Table,
} from 'semantic-ui-react';
import { useSearchParams, useParams } from 'react-router-dom';
import queryString from 'query-string';
import TxListComponent from '../components/TxList';
import PrevNext from '../components/PrevNext';
import {
  getBlockInfo,
  getBlockTransactionList,
} from '../lib/api';
import { formatTimestamp } from '../utils/formatters';

const TX_COUNT = 20;

function parseParams(start, count) {
  if (typeof start === 'string' && start.length > 0) {
    start = parseInt(start);
  } else {
    start = 0;
  }
  if (typeof count === 'string' && count.length > 0) {
    count = parseInt(count);
  } else {
    count = TX_COUNT;
  }
  return {
    start,
    count,
  };
}

function BlockTxList () {
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ block, setBlock ] = useState(null);
  const [ data, setData] = useState({
    count: 0,
    txs: [],
    nextTx: -1,
    prevTx: -1,
  });

  const [ searchParams, setSearchParams ] = useSearchParams();

  const { hash } = useParams();

  useEffect(() => {
    async function fetchBlock(hash) {
      const { block } = await getBlockInfo(hash);

      setBlock(block);
    }

    fetchBlock(hash);
  }, [ hash ]);

  useEffect(() => {
    async function fetchData(block, start, count) {
      try {
        const { txs } = await getBlockTransactionList(hash, start, count);
        setData({
          start,
          count,
          txs: txs.map((tx) => ({ ...tx, block: block })),
          nextTx: start + TX_COUNT < block.transactions.length ? start + TX_COUNT : -1,
          prevTx: start >= TX_COUNT ? start - TX_COUNT : -1,
        });
        setLoading(false);
      } catch (ex) {
        setLoading(false);
        setError(ex);
      }
    }
  
    const { start, count } = parseParams(searchParams.get('start'), searchParams.get('count'));

    fetchData(block, start, count);
  }, [block, searchParams]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">Transactions</Header>
        </Grid.Column>
      </Grid.Row>
      {block &&
      <Grid.Row>
        <Grid.Column>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Block hash:</Table.Cell>
                <Table.Cell>{block.hash}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Number:</Table.Cell>
                <Table.Cell>{block.number}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Date:</Table.Cell>
                <Table.Cell>{formatTimestamp(block.timestamp)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Num. Transactions:</Table.Cell>
                <Table.Cell>{block.transactions.length}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>}
      <Grid.Row>
        <Grid.Column>
          {loading && <Loader active inline size="tiny" />}
          <PrevNext
            hasPrev={data.prevTx >= 0}
            prev={`/block/${hash}/txs/?start=${data.prevTx}&count=${data.count}`}
            hasNext={data.nextTx >= 0}
            next={`/block/${hash}/txs/?start=${data.nextTx}&count=${data.count}`}
          />
          <TxListComponent txs={data.txs} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default BlockTxList;
