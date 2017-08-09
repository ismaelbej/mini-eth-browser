import React from 'react';
import {
  getTransactionInfo,
} from '../models/Transaction';
import TransactionInfo from './TransactionInfo';

class TransactionInfoView extends React.Component {
  constructor(props) {
    super(props);

    const { txid } = props;
    this.state = {
      tx: null,
      txid,
    };
  }

  componentDidMount() {
    this.loadTransactionInfo(this.state.txid);
  }

  componentWillReceiveProps(nextProps) {
    const { txid } = nextProps;
    if (this.state.txid !== txid) {
      this.setState({
        tx: null,
        txid,
      });
      this.loadTransactionInfo(txid);
    }
  }

  async loadTransactionInfo(txid) {
    const { tx } = await getTransactionInfo(txid);
    this.setState({
      tx,
      txid,
    });
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

export default TransactionInfoView;
