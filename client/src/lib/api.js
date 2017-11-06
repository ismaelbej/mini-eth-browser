import fetch from 'unfetch';
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

export default {
  getBlockchainInfo,
  getBlockInfo,
  getBlockList,
  getTransactionInfo,
  getTransactionList,
};
