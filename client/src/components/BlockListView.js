import React from 'react';
import {
  getBlockList,
} from '../models/Block';
import BlockList from './BlockList';

const BLOCK_START = -1;
const BLOCK_COUNT = 25;

class BlockListView extends React.Component {
  constructor(props) {
    super(props);

    const { start, count } = props;

    this.state = {
      start,
      count,
      blocks: null,
    };
  }

  componentDidMount() {
    this.loadBlockList(this.state.start, this.state.count);
  }

  componentWillReceiveProps(nextProps) {
    const { start, count } = nextProps;
    if (this.state.start !== start ||
      this.state.count !== count) {
      this.setState({
        start,
        count,
        blocks: null,
      });
      this.loadBlockList(start, count);
    }
  }

  async loadBlockList(start, count) {
    const { blocks } = await getBlockList(
      typeof start !== 'undefined' ? start : BLOCK_START,
      typeof count !== 'undefined' ? count : BLOCK_COUNT,
    );
    this.setState({
      blocks,
    });
    if (this.props.onListLoaded) {
      this.props.onListLoaded(blocks);
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
