import fetch from 'unfetch';

export async function getTransactionInfo(txid) {
  const { tx } = await fetch(`http://localhost:3001/api/v1/tx/${txid}`)
    .then(r => r.json());
  return { tx };
}

export async function getTransactionList(block, start, count) {
  const { txs } = await fetch(`http://localhost:3001/api/v1/tx/?block=${block}&start=${start}&count=${count}`)
    .then(r => r.json());
  return { txs };
}

export default {
  getTransactionInfo,
  getTransactionList,
};
