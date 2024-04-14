import React, { useEffect, useState } from 'react';
import {
  Grid,
  Header,
  Loader,
} from 'semantic-ui-react';
import queryString from 'query-string';
import TxListComponent from '../components/TxList';
import PrevNext from '../components/PrevNext';
// import AutoRefresh from '../components/AutoRefresh';
import {
  getBlockchainInfo,
  getTransactionList,
  subscribe,
} from '../lib/api';

const BLOCK_COUNT = 20;
const TXLIST_REFRESH_TIMEOUT = 10;

const TxListView = ({
  loading,
  data: {
    prevBlock = -1,
    nextBlock = -1,
    count,
    txs = [],
  } = {},
}) => (
  <Grid>
    <Grid.Row>
      <Grid.Column>
        <Header as="h1">Transactions</Header>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        {loading && <Loader active inline size="tiny" />}
        <PrevNext
          hasPrev={prevBlock >= 0}
          prev={`/tx/?start=${prevBlock}&count=${count}`}
          hasNext={nextBlock >= 0}
          next={`/tx/?start=${nextBlock}&count=${count}`}
        />
        <TxListComponent txs={txs} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

// const TxListViewRefresh = AutoRefresh(TxListView, TXLIST_REFRESH_TIMEOUT * 1000);

function parseParams(props) {
  let { start, count } = queryString.parse(props.location.search);
  if (typeof start === 'string' && start.length > 0) {
    start = parseInt(start, 10);
  } else {
    start = undefined;
  }
  if (typeof count === 'string' && count.length > 0) {
    count = parseInt(count, 10);
  } else {
    count = undefined;
  }
  return {
    start,
    count,
  };
}

function TxList () {

  useEffect(() => {
    async function fetchData(reqstart = undefined, reqcount = BLOCK_COUNT) {
      try {
        this.setState({ loading: true, error: false });
        const [{ txs, start, count }, { blockchain }] = await Promise.all([
          getTransactionList(reqstart, reqcount),
          getBlockchainInfo(),
        ]);
        const data = {
          start,
          count,
          txs,
          nextBlock: start - count >= 0 ? start - count : -1,
          prevBlock: start + count <= blockchain.block.number ? start + count : -1,
        };
        this.setState({ loading: false, error: false, data });
      } catch (err) {
        this.setState({ loading: false, error: true });
      }
    }
  }, []);

  // return <TxListViewRefresh {...this.state} refreshView={this.refreshView} />;
  return <TxListView {...this.state}/>;
}

export default TxList;
