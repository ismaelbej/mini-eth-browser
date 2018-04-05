import React from 'react';
import {
  Divider,
  Grid,
  Header,
  Loader,
  Message,
} from 'semantic-ui-react';
import {
  getTransactionInfo,
} from '../lib/api';
import TxInfoComponent from '../components/TxInfo';
import PrevNext from '../components/PrevNext';

class TxInfo extends React.Component {
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
    if (hash !== this.state.hash) {
      this.loadData(hash);
    }
  }

  async loadData(hash) {
    try {
      this.setState({ loading: true, error: false });
      const { tx } = await getTransactionInfo(hash);
      const nextTx = tx.transactionIndex + 1 < tx.block.transactions.length ?
        tx.block.transactions[tx.transactionIndex + 1] : null;
      const prevTx = tx.transactionIndex > 0 ?
        tx.block.transactions[tx.transactionIndex - 1] : null;
      const data = {
        hash,
        tx,
        nextTx,
        prevTx,
      };
      this.setState({ loading: false, error: false, data });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const {
      error,
      loading,
      data: {
        tx,
        nextTx = null,
        prevTx = null,
      } = {},
    } = this.state;
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
              hasPrev={!!prevTx}
              prev={`/tx/${prevTx}`}
              hasNext={!!nextTx}
              next={`/tx/${nextTx}`}
            />
            <Divider clearing hidden />
            <TxInfoComponent tx={tx} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default TxInfo;
