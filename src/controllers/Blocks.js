import _ from 'lodash';
import { getBlock } from '../lib/ethereum';
import { getTransactionInfo } from './Transactions';

export async function getBlockInfo(hash) {
  const block = await getBlock(hash);
  if (!block) {
    throw new Error(`Invalid block ${hash}`);
  }
  return block;
}

export async function listBlocks(start, count) {
  const end = _.max([-1, start - count]);
  const blocks = Promise.all(
    _.range(start, end, -1).map(getBlockInfo),
  );
  return blocks;
}

export async function listBlockTransactions(hash, start, count) {
  const block = await getBlockInfo(hash);
  const txids = block.transactions.slice(start, start + count);
  const txs = Promise.all(txids.map(getTransactionInfo));
  return txs;
}

export default {
  getBlockInfo,
  listBlocks,
  listBlockTransactions,
};
