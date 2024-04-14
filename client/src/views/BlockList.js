import React, { useEffect, useState } from 'react';
import {
  Grid,
  Header,
  Loader,
} from 'semantic-ui-react';
import { useSearchParams } from 'react-router-dom'
import queryString from 'query-string';
import BlockListComponent from '../components/BlockList';
import PrevNext from '../components/PrevNext';
// import AutoRefresh from '../components/AutoRefresh';
import {
  getBlockchainInfo,
  getBlockList,
  subscribe,
} from '../lib/api';

const BLOCK_COUNT = 20;
const BLOCKLIST_REFRESH_TIMEOUT = 10;

const BlockListView = ({
  prevBlock = -1,
  nextBlock = -1,
  count = BLOCK_COUNT,
  blocks = [],
}) => (
  <>
    <PrevNext
      hasPrev={prevBlock >= 0}
      prev={`/block/?start=${prevBlock}&count=${count}`}
      hasNext={nextBlock >= 0}
      next={`/block/?start=${nextBlock}&count=${count}`}
    />
    <BlockListComponent blocks={blocks} />
  </>
);

// const BlockListViewRefresh = AutoRefresh(BlockListView, BLOCKLIST_REFRESH_TIMEOUT * 1000);

function parseParams(start, count) {
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

function BlockList () {
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ data, setData ] = useState({
    prevBlock: -1,
    nextBlock: -1,
    count: BLOCK_COUNT,
    blocks: [],
  });
  const [ searchParams, setSearchParams ] = useSearchParams();

  useEffect(() => {
    async function fetchData(start, count) {
      try {
        const { blockchain } = await getBlockchainInfo();

        if (typeof count != "number") {
          count = BLOCK_COUNT;
        }

        if (typeof start != "number") {
          start = blockchain.blockNumber - count + 1;
        }
        if (start < 0) {
          start = 0;
        }

        const { blocks } = await getBlockList(start, count);

        const prevBlock = blocks.length > 0 && blocks[0].number >= BLOCK_COUNT ?
            blocks[0].number - BLOCK_COUNT : -1;
        const nextBlock = blocks.length > 0 && blocks[blocks.length - 1].number + 1 <= blockchain.blockNumber ?
            blocks[blocks.length - 1].number + 1 : -1;

        setData({
          prevBlock,
          nextBlock,
          start,
          count,
          blocks: blocks.reverse(),
        });        
        setLoading(false);
      } catch (ex) {
        setLoading(false);
        setError(ex);
      }
    }

    const { start, count } = parseParams(searchParams.get('start'), searchParams.get('count'));

    fetchData(start, count);
  }, [searchParams]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">Blocks</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          {loading 
            ? <Loader active inline size="tiny" />
            : <BlockListView {...data}/>}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default BlockList;
