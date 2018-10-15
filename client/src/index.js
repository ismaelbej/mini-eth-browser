import { app, h } from 'hyperapp';
import { getBlockchainInfo } from './lib/api';

const actions = {
  updateBlockchain: () => async (_, { refreshStatus }) => {
    const { blockchain } = await getBlockchainInfo();
    refreshStatus({ blockchain });
  },
  refreshStatus: ({ blockchain }) => () => ({
    blockchain,
  }),
};

const state = {
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
};

const view = ({
  blockchain: {
    block: {
      hash,
      timestamp,
      transactions,
    },
    blockNumber,
    gasPrice,
    hashrate,
    mining,
  },
}, { updateBlockchain }) => (
  <div
    oncreate={() => updateBlockchain()}
  >
    <section>
      <ul>
        <li>
          Block:
          {blockNumber}
        </li>
        <li>
          Block Hash:
          {hash}
        </li>
        <li>
          Transactions:
          {transactions.length}
        </li>
        <li>
          Gas Price:
          {gasPrice}
        </li>
        <li>
          Hash rate:
          {hashrate}
        </li>
        <li>
          Mining:
          {mining}
        </li>
        <li>
          Date:
          {timestamp}
        </li>
      </ul>
    </section>
  </div>
);

app(state, actions, view, document.getElementById('app'));
