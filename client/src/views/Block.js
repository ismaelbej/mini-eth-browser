import React from 'react';
import { getBlockInfo } from '../models/Block';
import BlockView from '../components/BlockView';

class Block extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      block: null,
    };
  }

  async componentDidMount() {
    const blockInfo = await getBlockInfo(1);
    this.setState({
      block: blockInfo.block,
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1>Block</h1>
        </div>
        <div className="row">
          {this.state.block && <BlockView block={this.state.block} />}
          {!this.state.block && 'Loading...'}
        </div>
      </div>);
  }
}

export default Block;
