import fetch from 'unfetch';
import { writeUrl } from '../utils/urlParams';

function fetchJson(url, params) {
  return fetch(writeUrl(url, params)).then(r => r.json());
}

export function getBlockchainInfo() {
  return fetchJson('http://localhost:3001/api/v1/blockchain');
}

export function getBlockInfo(hash) {
  return fetchJson(`http://localhost:3001/api/v1/block/${hash}`);
}

export function getBlockList(start, count) {
  return fetchJson('http://localhost:3001/api/v1/block/', { start, count });
}

export function getTransactionInfo(txid) {
  return fetchJson(`http://localhost:3001/api/v1/tx/${txid}`);
}

export function getTransactionList(block, start, count) {
  return fetchJson(`http://localhost:3001/api/v1/block/${block}/txs/`, { start, count });
}

export default {
  getBlockchainInfo,
  getBlockInfo,
  getBlockList,
  getTransactionInfo,
  getTransactionList,
};
