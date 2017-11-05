import Promise from 'bluebird';
import _ from 'lodash';
import {
  getBlock,
  getBlockTransactionCount,
  getTransactionFromBlock,
} from '../lib/ethereum';

export async function getBlockInfo(hash) {
  const block = await getBlock(hash);
  if (!block) {
    throw new Error(`Invalid block ${hash}`);
  }
  return block;
}

export async function listBlocks(start, count) {
  const blocks = await Promise.map(
    _.range(start, _.max([-1, start - count]), -1),
    blk => getBlockInfo(blk));
  return blocks;
}

export async function listBlockTransactions(hash, start, count) {
  const max = await getBlockTransactionCount(hash);
  const idxs = _.range(start, _.min([start + count, max]));
  const txs = await Promise.map(idxs,
    idx => getTransactionFromBlock(hash, idx));
  return txs;
}

export default {
  getBlockInfo,
  listBlocks,
  listBlockTransactions,
};
