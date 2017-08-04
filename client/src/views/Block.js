import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import queryString from 'query-string';
import {
  getBlockInfo,
  getBlockList
} from '../models/Block';
import BlockInfo from '../components/BlockInfo';
import BlockList from '../components/BlockList';

class BlockListView extends React.Component {

  constructor(props) {
    super(props);

    const { start, count } = queryString.parse(props.location.search);

    this.state = {
      start: typeof start !== 'undefined' ? start : -1,
      count: typeof count !== 'undefined' ? count : 25,
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
    const { start, count } = queryString.parse(nextProps.location.search)
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
        <div className="row">
          <h1>Block</h1>
        </div>
        <div className="row">
          {this.state.blocks && <BlockList blocks={this.state.blocks} />}
          {!this.state.blocks && 'Loading...'}
        </div>
      </div>
    );
  }
}

class BlockInfoView extends React.Component {

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
      </div>
    );
  }
}

const BlockView = () => (
  <Switch>
    <Route exact path="/block" component={BlockListView} />
    <Route path="/block/:hash" component={BlockInfoView} />
  </Switch>
);

export default BlockView;
