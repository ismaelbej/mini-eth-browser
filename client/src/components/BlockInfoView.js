import React from 'react';
import {
  getBlockInfo
} from '../models/Block';
import BlockInfo from './BlockInfo';

class BlockInfoView extends React.Component {

  constructor(props) {
    super(props);

    const { hash } = props;

    this.state = {
      block: null,
      hash: hash,
    };
  }

  async loadBlockInfo(hash) {
    const { block } = await getBlockInfo(hash);
    this.setState({
      block,
      hash
    });
  }

  componentDidMount() {
    this.loadBlockInfo(this.state.hash);
  }

  componentWillReceiveProps(nextProps) {
    const { hash } = nextProps;
    if (this.state.hash !== hash) {
      this.setState({
        block: null,
        hash
      });
      this.loadBlockInfo(hash);
    }
  }

  render() {
    return (
      <div>
        {this.state.block && <BlockInfo block={this.state.block} />}
        {!this.state.block && 'Loading...'}
      </div>
    );
  }
}

export default BlockInfoView;
