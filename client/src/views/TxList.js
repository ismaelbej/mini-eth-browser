import React from 'react';
import {
  Link,
} from 'react-router-dom';
import queryString from 'query-string';
import TxListComponent from '../components/TransactionList';
import TxListController from '../controllers/TxList';

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
    const { hash, start, count } = parseParams(props);
    this.state = {
      hash,
      start,
      count,
      txs: [],
      nextTx: undefined,
      prevTx: undefined,
    };
  }

  componentDidMount() {
    this.controller = new TxListController();
    this.controller.on('txs', txs => this.handleTxs(txs));
    this.controller.initialize(this.state.hash, this.state.start, this.state.count);
  }

  componentWillReceiveProps(nextProps) {
    const { hash, start, count } = parseParams(nextProps);
    if (this.state.hash !== hash ||
      this.state.start !== start ||
      this.state.count !== count) {
      this.setState({
        hash,
        start,
        count,
        txs: [],
        nextTx: undefined,
        prevTx: undefined,
      });
      this.controller.loadTxList(hash, start, count);
    }
  }

  handleTxs({ txs, nextTx, prevTx }) {
    this.setState({
      txs,
      nextTx,
      prevTx,
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1>Transactions</h1>
        </div>
        <div className="row">
          {this.state.prevTx !== false && <Link to={`/block/${this.state.hash}/txs/?start=${this.state.prevTx}${this.state.count ? `&count=${this.state.count}` : ''}`} className="button button-primary">Previous</Link>}
          {this.state.prevTx !== false && '\u00a0'}
          {this.state.nextTx && <Link to={`/block/${this.state.hash}/txs/?start=${this.state.nextTx}${this.state.count ? `&count=${this.state.count}` : ''}`} className="button button-primary">Next</Link>}
        </div>
        <div className="row">
          {this.state.txs && <TxListComponent txs={this.state.txs} />}
        </div>
      </div>
    );
  }
}

export default TxList;
