import React from 'react';
import {
  Link,
} from 'react-router-dom';
import queryString from 'query-string';
import BlockListComponent from '../components/BlockList';
import BlockListController from '../controllers/BlockList';

function parseParams(props) {
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

class BlockList extends React.Component {
  constructor(props) {
    super(props);
    const { start, count } = parseParams(props);
    this.state = {
      start,
      count,
      blocks: [],
      nextBlock: undefined,
      prevBlock: undefined,
    };
  }

  componentDidMount() {
    this.controller = new BlockListController();
    this.controller.on('blocks', blocks => this.handleBlocks(blocks));
    this.controller.initialize(this.state.start, this.state.count);
  }

  componentWillReceiveProps(nextProps) {
    const { start, count } = parseParams(nextProps);
    if (this.state.start !== start ||
      this.state.count !== count) {
      this.setState({
        start,
        count,
        blocks: [],
        nextBlock: undefined,
        prevBlock: undefined,
      });
      this.controller.loadBlockList(start, count);
    }
  }

  handleBlocks({ blocks, nextBlock, prevBlock }) {
    this.setState({
      blocks,
      nextBlock,
      prevBlock,
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1>Blocks</h1>
        </div>
        <div className="row">
          {this.state.prevBlock && <Link to={`/block/?start=${this.state.prevBlock}${this.state.count ? `&count=${this.state.count}` : ''}`} className="button button-primary">Previous</Link>}
          {this.state.prevBlock && '\u00a0'}
          {this.state.nextBlock && <Link to={`/block/?start=${this.state.nextBlock}${this.state.count ? `&count=${this.state.count}` : ''}`} className="button button-primary">Next</Link>}
        </div>
        <div className="row">
          {this.state.blocks && <BlockListComponent blocks={this.state.blocks} />}
        </div>
      </div>
    );
  }
}

export default BlockList;
