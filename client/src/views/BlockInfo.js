import React from 'react';
import {
  Link,
} from 'react-router-dom';
import BlockInfoComponent from '../components/BlockInfo';
import BlockInfoController from '../controllers/BlockInfo';

class BlockInfo extends React.Component {
  constructor(props) {
    super(props);
    const { hash } = props.match.params;
    this.state = {
      hash,
      block: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    this.controller = new BlockInfoController();
    this.controller.on('block', block => this.handleBlock(block));
    this.controller.on('fail', err => this.handleFailure(err));
    this.controller.initialize(this.state.hash);
  }

  componentWillReceiveProps(nextProps) {
    const { hash } = nextProps.match.params;
    if (this.state.hash !== hash) {
      this.setState({
        hash,
        block: undefined,
      });
      this.controller.loadBlock(hash);
    }
  }

  handleBlock({ block, nextBlock, prevBlock }) {
    this.setState({
      block,
      nextBlock,
      prevBlock,
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1>Block</h1>
        </div>
        <div className="row">
          {this.state.prevBlock && <Link to={`/block/${this.state.prevBlock}`} className="button button-primary">Previous</Link>}
          {this.state.prevBlock && '\u00a0'}
          {this.state.nextBlock !== false && <Link to={`/block/${this.state.nextBlock}`} className="button button-primary">Next</Link>}
        </div>
        <div className="row">
          {this.state.block && <BlockInfoComponent block={this.state.block} />}
        </div>
      </div>
    );
  }
}

export default BlockInfo;
