import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import TxInfoComponent from '../components/TxInfo';
import TxInfoController from '../controllers/TxInfo';

class TxInfo extends React.Component {
  constructor(props) {
    super(props);
    const { hash } = props.match.params;
    this.state = {
      hash,
      tx: undefined,
      nextTx: undefined,
      prevTx: undefined,
    };
  }

  componentDidMount() {
    this.controller = new TxInfoController();
    this.controller.on('tx', tx => this.handleTransaction(tx));
    this.controller.initialize(this.state.hash);
  }

  componentWillReceiveProps(nextProps) {
    const { hash } = nextProps.match.params;
    if (hash !== this.state.hash) {
      this.setState({
        hash,
        tx: undefined,
        nextTx: undefined,
        prevTx: undefined,
      });
      this.controller.loadTransaction(hash);
    }
  }

  handleTransaction({ tx, nextTx, prevTx }) {
    this.setState({
      tx,
      nextTx,
      prevTx,
    });
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Transaction</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {this.state.prevTx !== false && <Link to={`/tx/${this.state.prevTx}`} className="button button-primary">Previous</Link>}
            {this.state.prevTx !== false && '\u00a0'}
            {this.state.nextTx && <Link to={`/tx/${this.state.nextTx}`} className="button button-primary">Next</Link>}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {this.state.tx && <TxInfoComponent tx={this.state.tx} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default TxInfo;
