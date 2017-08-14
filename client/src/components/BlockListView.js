import React from 'react';
import {
  getBlockList,
} from '../lib/api';
import BlockList from './BlockList';

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
    const { blocks } = await getBlockList(start, count);
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
