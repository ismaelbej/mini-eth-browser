import React from 'react';
import {
  Grid,
  Header,
  Loader,
} from 'semantic-ui-react';
import queryString from 'query-string';
import TxListComponent from '../components/TxList';
import PrevNext from '../components/PrevNext';
import {
  getBlockchainInfo,
  getTransactionList,
} from '../lib/api';

const BLOCK_COUNT = 10;

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

class TxList extends React.Component {
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
    if (this.state.start !== start ||
        this.state.count !== count) {
      this.loadData(start, count);
    }
  }

  async loadData(reqstart = undefined, reqcount = BLOCK_COUNT) {
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

  render() {
    const {
      loading,
      data: {
        count,
        txs = [],
        nextBlock = -1,
        prevBlock = -1,
      } = {},
    } = this.state;
    return (
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
  }
}

export default TxList;
