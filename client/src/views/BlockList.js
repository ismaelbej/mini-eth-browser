import React from 'react';
import {
  Grid,
  Header,
  Loader,
} from 'semantic-ui-react';
import queryString from 'query-string';
import BlockListComponent from '../components/BlockList';
import PrevNext from '../components/PrevNext';
import {
  getBlockchainInfo,
  getBlockList,
} from '../lib/api';


const BLOCK_COUNT = 20;


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

class BlockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { start, count } = parseParams(this.props);
    this.loadData(start, count);
  }

  componentWillReceiveProps(nextProps) {
    const { start, count } = parseParams(nextProps);
    if (!this.state.data || this.state.data.start !== start ||
        this.state.data.count !== count) {
      this.loadData(start, count);
    }
  }

  async loadData(start, count = BLOCK_COUNT) {
    try {
      this.setState({ loading: true, error: false });
      const [{ blocks }, { blockchain }] = await Promise.all([
        getBlockList(start, count),
        getBlockchainInfo(),
      ]);
      const data = {
        blocks,
        start: blocks.length > 0 ? blocks[0].number : start,
        count,
        nextBlock: blocks.length > 0 && blocks[0].number >= BLOCK_COUNT ?
          blocks[0].number - BLOCK_COUNT : -1,
        prevBlock: blocks.length > 0 && blocks[0].number + BLOCK_COUNT <= blockchain.blockNumber ?
          blocks[0].number + BLOCK_COUNT : -1,
      };
      this.setState({ loading: false, error: false, data });
    } catch (ex) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const {
      loading,
      data: {
        count = BLOCK_COUNT,
        blocks = [],
        nextBlock = -1,
        prevBlock = -1,
      } = {},
    } = this.state;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Blocks</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {loading && <Loader active inline size="tiny" />}
            <PrevNext
              hasPrev={prevBlock >= 0}
              prev={`/block/?start=${prevBlock}&count=${count}`}
              hasNext={nextBlock >= 0}
              next={`/block/?start=${nextBlock}&count=${count}`}
            />
            <BlockListComponent blocks={blocks} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BlockList;
