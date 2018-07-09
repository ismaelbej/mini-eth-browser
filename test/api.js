import { test } from 'babel-tap';
import fetch from 'node-fetch';
import Ganache from 'ganache-core';
import { createApp, createServer } from '../src/app';

const GANACHE_PORT = 9633;
const API_PORT = 9637;
const API_BASE_URI = `http://localhost:${API_PORT}`;


let ganache;
let app;
let server;

test('Start', async (t) => {
  ganache = Ganache.server();
  t.ok(ganache, 'Ethereum node started');
  ganache.listen(GANACHE_PORT);

  const config = {
    rpcnode: `http://localhost:${GANACHE_PORT}`,
    port: API_PORT,
  };
  app = createApp();
  t.ok(app, 'Create API server');
  server = await createServer(app, config);
  t.ok(server, 'API server start listening');

  t.end();
});

test('Blockchain', async (t) => {
  const { blockchain } = await fetch(`${API_BASE_URI}/api/v1/blockchain`).then(r => r.json());
  t.notEqual(typeof blockchain, 'undefined', 'Return valid data');
  t.notEqual(typeof blockchain.blockNumber, 'undefined', 'Most recent block number');
  t.notEqual(typeof blockchain.block, 'undefined', 'Most recent block');
  t.notEqual(typeof blockchain.coinbase, 'undefined', 'Coinbase account');
  t.notEqual(typeof blockchain.mining, 'undefined', 'Mining status');
  t.end();
});

test('Close', async (t) => {
  t.ok(server, 'Stop listening API server');
  server.close();
  t.ok(ganache, 'Stop ethereum node');
  ganache.close();
  t.end();
});
