import React from 'react';
import { getBlockInfo } from '../models/Block';
import BlockInfo from '../components/BlockInfo';

class Block extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      block: null,
    };
  }

  async componentDidMount() {
    const { block } = await getBlockInfo(1);
    this.setState({
      block,
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1>Block</h1>
        </div>
        <div className="row">
          {this.state.block && <BlockInfo block={this.state.block} />}
          {!this.state.block && 'Loading...'}
        </div>
      </div>);
  }
}

export default Block;
