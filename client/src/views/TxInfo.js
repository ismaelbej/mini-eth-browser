import React, { useEffect, useState } from 'react';
import {
  Divider,
  Grid,
  Header,
  Loader,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import {
  getTransactionInfo,
  getBlockInfo,
} from '../lib/api';
import TxInfoComponent from '../components/TxInfo';
import PrevNext from '../components/PrevNext';

function TxInfo () {
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ data, setData ] = useState({
    nextTx: -1,
    prevTx: -1,
  });
  const { hash } = useParams();

  useEffect(() => {
    async function fetchData(hash) {
      try {
        const { tx } = await getTransactionInfo(hash);
        const { block } = await getBlockInfo(tx.blockHash);
        const nextTx = tx.transactionIndex + 1 < block.transactions.length ?
          block.transactions[tx.transactionIndex + 1] : null;
        const prevTx = tx.transactionIndex > 0 ?
          block.transactions[tx.transactionIndex - 1] : null;
        setData({
          hash,
          tx: { ...tx, block },
          nextTx,
          prevTx,
        });
        setLoading(false);
      } catch (ex) {
        setLoading(false);
        setError(ex);
      }
    }

    fetchData(hash);
  }, [ hash ]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">Transaction</Header>
        </Grid.Column>
      </Grid.Row>
      { /* <Grid.Row>
        <Grid.Column>
          {error && <Message error>
            <Message.Header>There was an error</Message.Header>
            <p>{`I don't know the error yet`}</p>
          </Message>}
        </Grid.Column>
      </Grid.Row> */ }
      <Grid.Row>
        <Grid.Column>
          {loading && <Loader active inline size="tiny" />}
          <PrevNext
            hasPrev={!!data.prevTx}
            prev={`/tx/${data.prevTx}`}
            hasNext={!!data.nextTx}
            next={`/tx/${data.nextTx}`}
          />
          <Divider clearing hidden />
          <TxInfoComponent tx={data.tx} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default TxInfo;
