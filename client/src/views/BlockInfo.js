import React, { useEffect, useState } from 'react';
import {
  Grid,
  Header,
  Loader,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import BlockInfoComponent from '../components/BlockInfo';
import PrevNext from '../components/PrevNext';
import {
  getBlockchainInfo,
  getBlockInfo,
} from '../lib/api';

function BlockInfo () {
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ data, setData ] = useState({
    block: null,
    hash: null,
    nextBlock: -1,
    prevBlock: -1,
 });
 const { hash } = useParams();

 useEffect(() => {
  async function fetchData(hash) {
    try {
      const [{ block }, { blockchain }] = await Promise.all([
        getBlockInfo(hash),
        getBlockchainInfo(),
      ]);
      const nextBlock = block.number > 0 ? block.number - 1 : -1;
      const prevBlock = block.number < blockchain.blockNumber ? block.number + 1 : -1;
      setData({
        hash,
        block,
        nextBlock,
        prevBlock,
      });
      setLoading(false);
    } catch (ex) {
      setError(ex);
      setLoading(false);
    }
  }

  fetchData(hash);
 }, [hash]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">Block</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          {loading && <Loader active inline size="tiny" />}
          <PrevNext
            hasPrev={data.prevBlock >= 0}
            prev={`/block/${data.prevBlock}`}
            hasNext={data.nextBlock >= 0}
            next={`/block/${data.nextBlock}`}
          />
          <BlockInfoComponent block={data.block} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default BlockInfo;
