import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  Header,
  Loader,
  Table,
} from 'semantic-ui-react';
import BlockList from '../components/BlockList';
import {
  getBlockchainInfo,
  getBlockList,
} from '../lib/api';
import {
  formatTimestamp,
  formatAmount,
} from '../utils/formatters';


const HOME_BLOCK_COUNT = 10;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    try {
      this.setState({ loading: true, error: false });
      const { blockchain } = await getBlockchainInfo();
      const { blocks } = (blockchain.blockNumber) ?
        await getBlockList(blockchain.blockNumber, HOME_BLOCK_COUNT) : {};
      const data = {
        blockchain,
        blocks,
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
        blockchain,
        blocks = [],
      } = {},
    } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Home</Header>
          </Grid.Column>
        </Grid.Row>
        {blockchain && <Grid.Row>
          <Grid.Column>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Latest block:</Table.Cell>
                  <Table.Cell>{blockchain.block.number}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Date:</Table.Cell>
                  <Table.Cell>{formatTimestamp(blockchain.block.timestamp)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Gas price:</Table.Cell>
                  <Table.Cell>{formatAmount(blockchain.gasPrice)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Mining:</Table.Cell>
                  <Table.Cell>{blockchain.mining ? 'yes' : 'no'}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Hashrate:</Table.Cell>
                  <Table.Cell>{blockchain.hashrate}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Coinbase:</Table.Cell>
                  <Table.Cell>{blockchain.coinbase}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>}
        <Grid.Row>
          <Grid.Column>
            <Header as="h3">Recent blocks</Header>
            {loading && <Loader active inline size="tiny" />}
            <Button.Group floated="right">
              <Button
                content="More blocks.."
                as={Link}
                to={'/block'}
              />
            </Button.Group>
            <BlockList blocks={blocks} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
