import React from 'react';
import {
  Grid,
  Header,
  Loader,
} from 'semantic-ui-react';
import BlockInfoComponent from '../components/BlockInfo';
import PrevNext from '../components/PrevNext';
import {
  getBlockchainInfo,
  getBlockInfo,
} from '../lib/api';

class BlockInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { hash } = this.props.match.params;
    this.loadData(hash);
  }

  componentWillReceiveProps(nextProps) {
    const { hash } = nextProps.match.params;
    if (this.state.hash !== hash) {
      this.loadData(hash);
    }
  }

  async loadData(hash) {
    try {
      this.setState({ loading: true, error: false });
      const [{ block }, { blockchain }] = await Promise.all([
        getBlockInfo(hash),
        getBlockchainInfo(),
      ]);
      const nextBlock = block.number > 0 ? block.number - 1 : -1;
      const prevBlock = block.number < blockchain.blockNumber ? block.number + 1 : -1;
      const data = {
        hash,
        block,
        nextBlock,
        prevBlock,
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
        block,
        nextBlock = -1,
        prevBlock = -1,
      } = {},
    } = this.state;
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
              hasPrev={prevBlock >= 0}
              prev={`/block/${prevBlock}`}
              hasNext={nextBlock >= 0}
              next={`/block/${nextBlock}`}
            />
            <BlockInfoComponent block={block} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BlockInfo;
