import React from 'react';
import {
  getBlockList
} from '../models/Block';
import BlockList from './BlockList';

const BLOCK_START = -1;
const BLOCK_COUNT = 25;

class BlockListView extends React.Component {

  constructor(props) {
    super(props);

    const { start, count } = props;

    this.state = {
      start: typeof start !== 'undefined' ? start : BLOCK_START,
      count: typeof count !== 'undefined' ? count : BLOCK_COUNT,
      blocks: null
    };
  }

  async loadBlockList(start, count) {
    const { blocks } = await getBlockList(start, count);
    this.setState({
      blocks
    });
  }

  componentDidMount() {
    this.loadBlockList(this.state.start, this.state.count);
  }

  componentWillReceiveProps(nextProps) {
    const { start, count } = nextProps;
    if (this.state.start !== start ||
      this.state.count !== count) {
      this.setState({
        start: start,
        count: count,
        blocks: null
      });
      this.loadBlockList(start, count);
    }
  }

  render() {
    return (
      <div>
        {this.state.blocks && <BlockList blocks={this.state.blocks} />}
        {!this.state.blocks && 'Loading...'}
      </div>
    );
  }
}

export default BlockListView;
