import Promise from 'bluebird';
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
  const blocks = await Promise.map(_.range(start, _.max([-1, start - count]), -1), blk =>
    getBlockInfo(blk),
  );
  return blocks;
}

export async function listBlockTransactions(hash, start, count) {
  const block = await getBlockInfo(hash);
  const txids = block.transactions.slice(start, start + count);
  const txs = await Promise.map(txids, txid => getTransactionInfo(txid));
  return txs;
}

export default {
  getBlockInfo,
  listBlocks,
  listBlockTransactions,
};
