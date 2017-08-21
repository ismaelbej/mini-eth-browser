import React from 'react';
import {
  Link,
} from 'react-router-dom';
import TxInfoComponent from '../components/TransactionInfo';
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
      <div>
        <div className="row">
          <h1>Transaction</h1>
        </div>
        <div className="row">
          {this.state.prevTx !== false && <Link to={`/tx/${this.state.prevTx}`} className="button button-primary">Previous</Link>}
          {this.state.prevTx !== false && '\u00a0'}
          {this.state.nextTx && <Link to={`/tx/${this.state.nextTx}`} className="button button-primary">Next</Link>}
        </div>
        <div className="row">
          {this.state.tx && <TxInfoComponent tx={this.state.tx} />}
        </div>
      </div>
    );
  }
}

export default TxInfo;
