import React from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import queryString from 'query-string';
import BlockInfoView from '../components/BlockInfoView';
import BlockListView from '../components/BlockListView';
import TransactionListView from '../components/TransactionListView';

const TransactionListQuery = (props) => {
  const hash = props.match.params.hash;
  const { start, count } = queryString.parse(props.location.search);
  return (
    <div>
      <div className="row">
        <h1>Transactions</h1>
      </div>
      <div className="row">
        <TransactionListView block={hash} start={start} count={count} />
      </div>
    </div>
  );
};

class BlockListQuery extends React.Component {
  static parseParams(props) {
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

  static calcNextBlock(start, count) {
    if (typeof start === 'number') {
      return start - count;
    }
    return undefined;
  }

  static calcPrevBlock(start, count) {
    if (typeof start === 'number') {
      return start + count;
    }
    return undefined;
  }

  constructor(props) {
    super(props);
    const { start, count } = BlockListQuery.parseParams(props);
    this.state = {
      start,
      count,
      nextBlock: BlockListQuery.calcNextBlock(start, count),
      prevBlock: BlockListQuery.calcPrevBlock(start, count),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { start, count } = BlockListQuery.parseParams(nextProps);
    if (this.state.start !== start ||
      this.state.count !== count) {
      this.setState({
        start,
        count,
        nextBlock: BlockListQuery.calcNextBlock(start, count),
        prevBlock: BlockListQuery.calcPrevBlock(start, count),
      });
    }
  }

  onListLoaded(blocks) {
    if (blocks && blocks.length > 0) {
      const start = blocks[0].number;
      const count = blocks.length;
      this.setState({
        nextBlock: BlockListQuery.calcNextBlock(start, count),
        prevBlock: BlockListQuery.calcPrevBlock(start, count),
      });
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1>Block</h1>
        </div>
        <div className="row">
          {this.state.nextBlock && <Link to={`/block/?start=${this.state.nextBlock}${this.state.count ? `&count=${this.state.count}` : ''}`} className="button button-primary">Next</Link>}
          &nbsp;
          {this.state.prevBlock && <Link to={`/block/?start=${this.state.prevBlock}${this.state.count ? `&count=${this.state.count}` : ''}`} className="button button-primary">Previous</Link>}
        </div>
        <div className="row">
          <BlockListView
            start={this.state.start}
            count={this.state.count}
            onListLoaded={blocks => this.onListLoaded(blocks)}
          />
        </div>
      </div>
    );
  }
}

const BlockInfoQuery = (props) => {
  const hash = props.match.params.hash;
  return (
    <div>
      <div className="row">
        <h1>Block</h1>
      </div>
      <div className="row">
        <BlockInfoView hash={hash} />
      </div>
    </div>
  );
};

const BlockView = () => (
  <div>
    <Switch>
      <Route exact path="/block" component={BlockListQuery} />
      <Route exact path="/block/:hash" component={BlockInfoQuery} />
      <Route exact path="/block/:hash/txs" component={TransactionListQuery} />
    </Switch>
  </div>
);

export default BlockView;
