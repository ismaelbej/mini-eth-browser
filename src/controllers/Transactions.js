import {
  getBlock,
  getCode,
  getTransaction,
  getTransactionReceipt,
} from '../lib/ethereum';

export async function getTransactionInfo(txid) {
  const [tx, receipt] = await Promise.all([
    getTransaction(txid),
    getTransactionReceipt(txid),
  ]);
  const block = receipt ? await getBlock(tx.blockHash) : null;
  if (block) {
    tx.block = block;
  }
  if (receipt) {
    tx.receipt = receipt;
  }
  if (tx.to) {
    const code = await getCode(tx.to);
    if (code && code !== '0x0') {
      tx.code = code;
    }
  }
  return tx;
}

export function listTransactions() {
  return [];
}

export default {
  getTransactionInfo,
  listTransactions,
};
