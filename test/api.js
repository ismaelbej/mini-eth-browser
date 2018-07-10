import { test } from 'babel-tap';
import fetch from 'node-fetch';
import Ganache from 'ganache-core';
import Web3 from 'web3';
import { createApp, createServer } from '../src/app';
import * as SampleContractJson from './SampleContract.json';

const API_PORT = 9637;
const API_BASE_URI = `http://localhost:${API_PORT}`;

let app;
let server;
let provider;
let web3;
let accounts;

test('Start', async (t) => {
  provider = Ganache.provider();
  t.ok(provider, 'Ethereum provider started');
  web3 = new Web3(provider);
  t.ok(web3, 'Web3 initialized correctly');
  accounts = await web3.eth.personal.getAccounts();

  const config = {
    web3provider: provider,
    port: API_PORT,
    contracts: [
      {
        contractName: SampleContractJson.contractName,
        abi: SampleContractJson.abi,
      },
    ],
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

test('Contracts', async (t) => {
  const SampleContract = new web3.eth.Contract(SampleContractJson.abi);
  const sampleContract = await SampleContract.deploy({
    data: `0x${SampleContractJson.bytecode}`,
  }).send({
    from: accounts[0],
    gas: 1000000,
  });
  await sampleContract.methods.genLogString(1234, "hola")
    .send({ from: accounts[0], gas: 1000000 });
  const { txs } = await fetch(`${API_BASE_URI}/api/v1/tx`).then(r => r.json());
  t.notEqual(typeof txs, 'undefined', 'Return valid data');
  t.equal(txs.length, 2, 'Single contract present');
  t.end();
});

test('Close', async (t) => {
  t.ok(server, 'Stop listening API server');
  server.close();
  t.ok(provider, 'Stop ethereum node');
  t.end();
});
