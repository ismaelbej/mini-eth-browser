import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { getBlockInfo } from '../models/Block';
import BlockInfo from '../components/BlockInfo';

const BlockList = () => {
  return (
    <div>
      <div className="row">
        <h1>Block</h1>
      </div>
      <div className="row">
        Loading...
      </div>
    </div>);
}

class BlockView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      block: null,
      hash: props.match.params.hash,
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
    if (this.props.match.params.hash !== nextProps.match.params.hash) {
      this.setState({
        block: null,
        hash: nextProps.match.params.hash
      });
      this.loadBlockInfo(nextProps.match.params.hash);
    }
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

const Block = () => (
  <Switch>
    <Route exact path="/block" component={BlockList} />
    <Route path="/block/:hash" component={BlockView} />
  </Switch>
);

export default Block;
