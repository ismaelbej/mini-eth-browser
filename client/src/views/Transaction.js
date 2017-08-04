import React from 'react';
import {
  Link,
  Route,
  Switch
} from 'react-router-dom';
import {
  getTransactionInfo
} from '../models/Transaction';
import TransactionInfo from '../components/TransactionInfo';

class TransactionListView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      txs: null,
      start: -1,
      count: 25
    };
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

class TransactionInfoView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tx: null,
      txid: props.match.params.txid
    };
  }

  async loadTransactionInfo(txid) {
    const { tx } = await getTransactionInfo(txid);
    console.log(tx);
    this.setState({
      tx,
      txid
    });
  }

  componentDidMount() {
    this.loadTransactionInfo(this.state.txid);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.txid !== nextProps.match.params.txid) {
      this.setState({
        tx: null,
        txid: nextProps.match.params.txid
      });
      this.loadTransactionInfo(nextProps.match.params.txid);
    }
  }

  render() {
    return (
      <div>
        {!this.state.tx && 'Loading...'}
        {this.state.tx && <TransactionInfo tx={this.state.tx} />}
      </div>
    );
  }
}

const TransactionView = () => (
  <div>
    <div className="row">
      <h1>Transaction</h1>
    </div>
    <div className="row">
      <Switch>
        <Route exact path="/tx" component={TransactionListView} />
        <Route path="/tx/:txid" component={TransactionInfoView} />
      </Switch>
    </div>
  </div>
);


export default TransactionView;
