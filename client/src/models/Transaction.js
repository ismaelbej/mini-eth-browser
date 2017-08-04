import fetch from 'unfetch';

export async function getTransactionInfo(txid) {
  const { tx } = await fetch(`http://localhost:3001/api/v1/tx/${txid}`)
    .then(r => r.json());
  return { tx };
}

export default {
  getTransactionInfo,
};
