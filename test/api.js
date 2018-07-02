import { test } from 'babel-tap';
import fetch from 'node-fetch';
import Ganache from 'ganache-core';
import { createApp, createServer } from '../src/app';

let ganache;
let app;
let server;

test('Start', async (t) => {
  ganache = Ganache.server();
  t.ok(ganache);
  ganache.listen(9545);

  const config = {
    rpcnode: 'http://localhost:9545',
    port: 9434,
  };
  app = createApp();
  t.ok(app);
  server = await createServer(app, config);
  t.ok(server);

  t.end();
});

test('Blockchain', async (t) => {
  const { blockchain } = await fetch('http://localhost:9434/api/v1/blockchain').then(r => r.json());
  t.notEqual(typeof blockchain, 'undefined');
  t.notEqual(typeof blockchain.blockNumber, 'undefined');
  t.notEqual(typeof blockchain.block, 'undefined');
  t.notEqual(typeof blockchain.coinbase, 'undefined');
  t.notEqual(typeof blockchain.mining, 'undefined');
  t.end();
});

test('Close', async (t) => {
  t.ok(server);
  server.close();
  t.ok(ganache);
  ganache.close();
  t.end();
});
