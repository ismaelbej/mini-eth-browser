import _ from 'lodash';
import {
  getBlock,
  getCode,
  getTransaction,
  getTransactionReceipt,
} from '../lib/ethereum';
import Contracts from './Contracts';

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
    tx.receipt.logsDecoded = Contracts.decodeLogs(tx.receipt.logs);
  }
  if (tx.to) {
    const code = await getCode(tx.to);
    if (code && code !== '0x0') {
      tx.code = code;
    }
  }
  if (tx.input !== '0x') {
    tx.inputDecoded = Contracts.decodeFunction(tx.input);
    // console.log(JSON.stringify(Contracts.decodeFunction(tx.input), null, '  '));
  }
  // Contracts.decodeFunction(tx);
  return tx;
}

export async function listTransactions(start, count) {
  const blockTransactions = await Promise.map(
    _.range(start, _.max([-1, start - count]), -1),
    blockNum => getBlock(blockNum).then(block => block.transactions));
  const transactions = _.flatten(blockTransactions);
  return Promise.map(transactions, getTransactionInfo);
}

export default {
  getTransactionInfo,
  listTransactions,
};
