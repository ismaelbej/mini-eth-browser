import React from 'react';
import BlockListView from '../components/BlockListView';

const HOME_BLOCK_COUNT = 10;

const Home = () => (
  <div>
    <div className="row">
      <h1>Home</h1>
    </div>
    <div className="row">
      <div className="six columns">
        <h3>Recent blocks</h3>
        <BlockListView count={HOME_BLOCK_COUNT} />
      </div>
      <div className="six columns" />
    </div>
  </div>
);

export default Home;
