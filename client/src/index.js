import { app, h } from 'hyperapp';
import { location, Route } from '@hyperapp/router';

// import { getBlockchainInfo } from './lib/api';
import mactions from './actions';
import BlockchainInfo from './components/BlockchainInfo';
import BlockList from './components/BlockList';

import 'bulma/css/bulma.css';

const actions = {
  location: location.actions,
  ...mactions,
  // updateBlockchain: () => async (_, { refreshStatus }) => {
  //   const { blockchain } = await getBlockchainInfo();
  //   refreshStatus({ blockchain });
  // },
  // refreshStatus: ({ blockchain }) => () => ({
  //   blockchain,
  // }),
};

const state = {
  location: location.state,
  blockchain: {
    block: {
      hash: '0x',
      timestamp: 0,
      transactions: [],
    },
    blockNumber: 0,
    coinbase: '0x',
    gasPrice: 0,
    hashrate: 0,
    mining: false,
  },
  blocks: [
    {
      blockNumber: 0,
      hash: '0x',
      timestamp: 0,
      transactions: [],
    },
  ],
};

const HomeView = () => ({ blocks }, { updateBlocksAndSchedule }) => (
  <div
    oncreate={() => {
      updateBlocksAndSchedule();
    }}
  >
    <BlockList blocks={blocks} />
  </div>
);

const view = ({
  blockchain: {
    block: {
      number,
      timestamp,
    },
    gasPrice,
    hashrate,
    mining,
  },
}, { updateStatusAndSchedule }) => (
  <div
    oncreate={() => {
      updateStatusAndSchedule();
    }}
  >
    <BlockchainInfo
      blocks={1 + number}
      gasPrice={gasPrice}
      timestamp={timestamp}
      mining={mining}
      hashrate={hashrate}
    />
    <Route path="/" render={HomeView} />
  </div>
);

app(state, actions, view, document.getElementById('app'));
