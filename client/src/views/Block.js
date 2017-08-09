import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import queryString from 'query-string';
import BlockInfoView from '../components/BlockInfoView';
import BlockListView from '../components/BlockListView';

const BlockListQuery = (props) => {
  const { start, count } = queryString.parse(props.location.search);
  return (
    <div>
      <BlockListView start={start} count={count} />
    </div>
  );
};

const BlockInfoQuery = (props) => {
  const hash = props.match.params.hash;
  return (
    <div>
      <BlockInfoView hash={hash} />
    </div>
  );
};

const BlockView = () => (
  <div>
    <div className="row">
      <h1>Block</h1>
    </div>
    <div className="row">
      <Switch>
        <Route exact path="/block" component={BlockListQuery} />
        <Route path="/block/:hash" component={BlockInfoQuery} />
      </Switch>
    </div>
  </div>
);

export default BlockView;
