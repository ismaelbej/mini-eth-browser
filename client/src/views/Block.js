import React from 'react';
import {
  Link,
  Route,
  Switch
} from 'react-router-dom';
import queryString from 'query-string';
import {
  getBlockInfo,
  getBlockList
} from '../models/Block';
import BlockInfo from '../components/BlockInfo';
import BlockListView from '../components/BlockListView';

const BlockListQuery = (props) => {
  let { start, count } = queryString.parse(props.location.search);
  start = parseInt(start);
  count = parseInt(count);
  const next = start - count;
  const prev = start + count;
  return (
    <div>
      <div className="row">
        <Link to={`/block/?start=${next}&count=${count}`}><button className="button-primary">Next</button></Link>
        <Link to={`/block/?start=${prev}&count=${count}`}><button className="button-primary">Prev</button></Link>
      </div>
      <BlockListView start={start} count={count} />
    </div>
  );
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
        {this.state.block && <BlockInfo block={this.state.block} />}
        {!this.state.block && 'Loading...'}
      </div>
    );
  }
}

const BlockView = () => (
  <div>
    <div className="row">
      <h1>Block</h1>
    </div>
    <div className="row">
      <Switch>
        <Route exact path="/block" component={BlockListQuery} />
        <Route path="/block/:hash" component={BlockInfoView} />
      </Switch>
    </div>
  </div>
);

export default BlockView;
