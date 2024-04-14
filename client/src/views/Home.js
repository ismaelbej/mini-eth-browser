import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  Header,
  Loader,
} from 'semantic-ui-react';
import BlockList from '../components/BlockList';
import {
  getBlockchainInfo,
  getBlockList,
} from '../lib/api';

const HOME_BLOCK_COUNT = 15;
const HOME_REFRESH_TIMEOUT = 10;

function Home () {
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ data, setData ] = useState({
    blocks: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { blockchain } = await getBlockchainInfo();

        const start = blockchain.blockNumber >= HOME_BLOCK_COUNT
          ? blockchain.blockNumber - HOME_BLOCK_COUNT + 1
          : 0;

        const { blocks } = await getBlockList(start, HOME_BLOCK_COUNT);
        setData({
          blocks: blocks.reverse(),
        });
        setLoading(false);
      } catch (ex) {
        setLoading(false);
        setError(ex);
      }
    }

    fetchData();
  }, []);

  const { blocks } = data;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">Home</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as="h3">Recent blocks</Header>
          {loading && <Loader active inline size="tiny" />}
          <Button.Group floated="right">
            <Button
              content="More blocks.."
              as={Link}
              to="/block"
            />
          </Button.Group>
          <BlockList blocks={blocks} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}


export default Home;
