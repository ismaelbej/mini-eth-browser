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
      });
    }
  }

  handleBlocks(blocks) {
    this.setState({
      blocks,
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1>Blocks</h1>
        </div>
        <div className="row">
          <Link to={`/block/?start=${this.state.nextBlock}${this.state.count ? `&count=${this.state.count}` : ''}`} className="button button-primary">Next</Link>
          <Link to={`/block/?start=${this.state.prevBlock}${this.state.count ? `&count=${this.state.count}` : ''}`} className="button button-primary">Previous</Link>
        </div>
        <div className="row">
          {this.state.blocks && <BlockListComponent blocks={this.state.blocks} />}
        </div>
      </div>
    );
  }
}

export default BlockList;
