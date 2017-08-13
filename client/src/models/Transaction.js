import fetch from 'unfetch';
import { writeUrl } from '../utils/urlParams';

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
  getTransactionInfo,
  getTransactionList,
};
