import test from 'tape';
import fetch from 'node-fetch';
import ganache from 'ganache';
import { createApp, createServer } from '../src/app.js';
import ethereum from '../src/services/ethereum.js';

const API_PORT = 29637;
const API_BASE_URI = `http://localhost:${API_PORT}`;

let app;
let server;
let provider;
let web3;
let accounts;

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

test('Start', async (t) => {
  provider = ganache.provider();
  t.ok(provider, 'Ethereum provider started');
  const config = {
    rpcnode: provider,
    port: API_PORT,
  };

  const web3 = ethereum(config);
  t.ok(web3, 'Web3 initialized correctly');

  app = createApp(web3);
  t.ok(app, 'Create API server');
  server = await createServer(app, API_PORT);
  t.ok(server, 'API server start listening');

  t.end();
});

test('Blockchain', async (t) => {
  const result = await fetch(`${API_BASE_URI}/api/v1/blockchain`).then(r => r.json());
  const { blockchain } = result;
  t.ok(blockchain, 'Return valid data');
  t.ok(blockchain.blockNumber >= 0, 'Most recent block number');
  t.ok(blockchain.gasPrice, 'Most recent block');
  t.ok(blockchain.chainId, 'Mining status');
  t.end();
});

test('Blocks', async (t) => {
  const result = await fetch(`${API_BASE_URI}/api/v1/block`).then(r => r.json());
  const { blocks } = result;
  t.ok(blocks, 'Return valid data');
  t.end();
});

test('Close', async (t) => {
  t.ok(server, 'Stop listening API server');
  server.close();
  t.ok(provider, 'Stop ethereum node');
  t.end();
});
