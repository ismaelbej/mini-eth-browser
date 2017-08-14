import fetch from 'unfetch';
import { writeUrl } from '../utils/urlParams';

export async function getBlockInfo(hash) {
  const { block } = await fetch(writeUrl(`http://localhost:3001/api/v1/block/${hash}`))
    .then(r => r.json());
  return { block };
}

export async function getBlockList(start, count) {
  const { blocks } = await fetch(writeUrl('http://localhost:3001/api/v1/block/', { start, count }))
    .then(r => r.json());
  return { blocks };
}

export async function getTransactionInfo(txid) {
  const { tx } = await fetch(writeUrl(`http://localhost:3001/api/v1/tx/${txid}`))
    .then(r => r.json());
  return { tx };
}

export async function getTransactionList(block, start, count) {
  const { txs } = await fetch(writeUrl(`http://localhost:3001/api/v1/block/${block}/txs/`, { start, count }))
    .then(r => r.json());
  return { txs };
}

export default {
  getBlockInfo,
  getBlockList,
  getTransactionInfo,
  getTransactionList,
};
