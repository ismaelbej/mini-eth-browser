import _ from 'lodash';
import {
  getBlock,
  getCode,
  getTransaction,
  getTransactionReceipt,
} from '../lib/ethereum';
import Contracts from './Contracts';

function formatTransaction(transaction, receipt, block, code) {
  return {
    ...transaction,
    block,
    receipt: receipt ? {
      ...receipt,
      logsDecoded: Contracts.decodeLogs(receipt.logs),
    } : undefined,
    code,
    inputDecoded: Contracts.decodeFunction(transaction.input),
  };
}

export async function getTransactionInfo(txid) {
  const [tx, receipt] = await Promise.all([
    getTransaction(txid),
    getTransactionReceipt(txid),
  ]);
  const block = receipt ? await getBlock(tx.blockHash) : undefined;
  if (block) {
    tx.block = block;
  }
  const code = (tx && tx.to) ? await getCode(tx.to) : undefined;
  return formatTransaction(tx, receipt, block, code);
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
