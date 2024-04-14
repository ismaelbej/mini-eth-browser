import express from 'express';
import blocks from '../controllers/blocks.js';
import transactions from '../controllers/transactions.js';

const BLOCK_COUNT = 25;
const TX_START = 0;
const TX_COUNT = 25;

const parseBlockParams = async (query) => {
  let start = -1;
  if (typeof query.start === 'string') {
    start = parseInt(query.start, 10);
  }
  let count = BLOCK_COUNT;
  if (typeof query.count === 'string') {
    count = parseInt(query.count, 10);
  }
  if (count <= 0) {
    count = BLOCK_COUNT;
  }
  return {
    start,
    count,
  };
}

const parseTxParams = async (query) => {
  let start = TX_START;
  if (typeof query.start === 'string') {
    start = parseInt(query.start, 10);
  }
  let count = TX_COUNT;
  if (typeof query.count === 'string') {
    count = parseInt(query.count, 10);
  }
  if (count <= 0) {
    count = TX_COUNT;
  }
  return {
    start,
    count,
  };
}

const getBlocks = ({ listBlocks, getBlockNumber }) => async (req, res) => {
  try {
    let start, count;
    const params = await parseBlockParams(req.query);
    ({ start, count } = params);
    if (start < 0) {
      const end = Number(await getBlockNumber());
      if (end >= count) {
        start = end - count + 1
      } else {
        start = 0;
        count = end + 1;
      }
    }
    if (start >= 0) {
      const blocks = await listBlocks(start, count);
      res.json({ blocks });
    } else {
      res.status(500);
      res.json({
        errors: ['Invalid parameters'],
      });
    }
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
};

const getBlock = ({ getBlockInfo }) => async (req, res) => {
  try {
    const { hash } = req.params;
    const block = await getBlockInfo(hash);
    res.json({ block });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
};

const getBlockTransactions = ({ listBlockTransactions }) => async (req, res) => {
  try {
    const { hash } = req.params;
    const { start, count } = await parseTxParams(req.query);
    const txs = await listBlockTransactions(hash, start, count);
    res.json({ txs });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
};

export default (web3) => {
  const { getBlockNumber } = web3;
  const { listBlocks, getBlockInfo } = blocks(web3);
  const { listBlockTransactions } = transactions(web3);

  const router = express.Router();

  router.get('/', getBlocks({ listBlocks, getBlockNumber }));
  router.get('/:hash', getBlock({ getBlockInfo }));
  router.get('/:hash/txs', getBlockTransactions({ listBlockTransactions }));

  return router;
}
