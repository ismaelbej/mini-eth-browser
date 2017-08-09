import React from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import queryString from 'query-string';
import BlockInfoView from '../components/BlockInfoView';
import BlockListView from '../components/BlockListView';

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
        {this.state.nextBlock && <Link to={`/block/?start=${this.state.nextBlock}`}><button className="button-primary">Next</button></Link>}
        {this.state.prevBlock && <Link to={`/block/?start=${this.state.prevBlock}`}><button className="button-primary">Previous</button></Link>}
        <BlockListView
          start={this.state.start}
          count={this.state.count}
          onListLoaded={blocks => this.onListLoaded(blocks)}
        />
      </div>
    );
  }
}

const BlockInfoQuery = (props) => {
  const hash = props.match.params.hash;
  return (
    <div>
      <BlockInfoView hash={hash} />
    </div>
  );
};

const BlockView = () => (
  <div>
    <div className="row">
      <h1>Block</h1>
    </div>
    <div className="row">
      <Switch>
        <Route exact path="/block" component={BlockListQuery} />
        <Route path="/block/:hash" component={BlockInfoQuery} />
      </Switch>
    </div>
  </div>
);

export default BlockView;
