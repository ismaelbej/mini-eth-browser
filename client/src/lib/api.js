import fetch from 'unfetch';
import socketIOClient from "socket.io-client";
import { writeUrl } from '../utils/urlParams';
import config from '../config';


function fetchJson(url, params) {
  return fetch(writeUrl(url, params)).then(r => r.json());
}

export function getAccountInfo(address) {
  return fetchJson(`${config.rpcpath}/api/v1/account/${address}`);
}

export function getBlockchainInfo() {
  return fetchJson(`${config.rpcpath}/api/v1/blockchain`);
}

export function getBlockInfo(hash) {
  return fetchJson(`${config.rpcpath}/api/v1/block/${hash}`);
}

export function getBlockList(start, count) {
  return fetchJson(`${config.rpcpath}/api/v1/block/`, { start, count });
}

export function getBlockTransactionList(block, start, count) {
  return fetchJson(`${config.rpcpath}/api/v1/block/${block}/txs/`, { start, count });
}

export function getTransactionInfo(txid) {
  return fetchJson(`${config.rpcpath}/api/v1/tx/${txid}`);
}

export function getTransactionList(start, count) {
  return fetchJson(`${config.rpcpath}/api/v1/tx/`, { start, count });
}

class SimpleEvent {
  constructor() {
    this.callbacks = [];
    this.socket = socketIOClient(config.rpcpath);
    this.socket.on('newBlock', (block => {
      this.emit('newBlock', block);
    }));
  }

  on(name, callback) {
    this.callbacks.push(callback);
  }

  emit(name, block) {
    this.callbacks.forEach(callback => {
      callback(block);
    });
  }
};

const newBlock = new SimpleEvent();

export function subscribe(name, callback) {
  newBlock.on(name, callback);
}

export default {
  getBlockchainInfo,
  getBlockInfo,
  getBlockList,
  getTransactionInfo,
  getTransactionList,
};
