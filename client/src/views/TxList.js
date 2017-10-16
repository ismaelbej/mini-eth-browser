import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Button,
  Grid,
  Header,
  Loader,
  Table,
} from 'semantic-ui-react';
import queryString from 'query-string';
import TxListComponent from '../components/TxList';
import {
  getBlockInfo,
  getTransactionList,
} from '../lib/api';
import { formatTimestamp } from '../utils/formatters';


const TX_COUNT = 20;


function parseParams(props) {
  const { hash } = props.match.params;
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
    hash,
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
    const { hash, start, count } = parseParams(this.props);
    this.loadData(hash, start, count);
  }

  componentWillReceiveProps(nextProps) {
    const { hash, start, count } = parseParams(nextProps);
    if (this.state.hash !== hash ||
        this.state.start !== start ||
        this.state.count !== count) {
      this.loadData(hash, start, count);
    }
  }

  async loadData(hash, start = 0, count = TX_COUNT) {
    try {
      this.setState({ loading: true, error: false });
      const [{ txs }, { block }] = await Promise.all([
        getTransactionList(hash, start, count),
        getBlockInfo(hash),
      ]);
      const data = {
        hash,
        start,
        count,
        block,
        txs,
        nextTx: start + txs.length < block.transactions.length ? start + txs.length : -1,
        prevTx: start >= count ? start - count : -1,
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
        hash,
        block,
        count,
        txs = [],
        nextTx = -1,
        prevTx = -1,
      } = {},
    } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Transactions</Header>
          </Grid.Column>
        </Grid.Row>
        {block && <Grid.Row>
          <Grid.Column>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Hash:</Table.Cell>
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
            <Button.Group floated="right">
              <Button
                {...{ disabled: prevTx < 0 }}
                labelPosition="left"
                content="Previous"
                icon="left chevron"
                as={Link}
                to={`/block/${hash}/txs/?start=${prevTx}&count=${count}`}
              />
              <Button
                {...{ disabled: nextTx < 0 }}
                labelPosition="right"
                content="Next"
                icon="right chevron"
                as={Link}
                to={`/block/${hash}/txs/?start=${nextTx}&count=${count}`}
              />
            </Button.Group>
            <TxListComponent txs={txs} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default TxList;
