import express from 'express';
import { getBlockInfo, listBlocks, listBlockTransactions } from '../controllers/Blocks';
import { getBlockNumber } from '../lib/ethereum';

const router = express.Router();

const BLOCK_COUNT = 25;
const TX_START = 0;
const TX_COUNT = 25;

async function parseBlockParams(query) {
  let start = -1;
  if (typeof query.start === 'string') {
    start = parseInt(query.start, 10);
  } else if (typeof query.start === 'undefined') {
    start = await getBlockNumber();
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

router.get('/', async (req, res) => {
  try {
    const { start, count } = await parseBlockParams(req.query);
    if (start >= 0) {
      const blocks = await listBlocks(start, count);
      res.json({
        blocks,
      });
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
});

router.get('/:hash', async (req, res) => {
  try {
    const block = await getBlockInfo(req.params.hash);
    res.json({
      block,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
});

async function parseTxParams(query) {
  let start = TX_START;
  if (typeof query.start === 'string') {
    start = parseInt(query.start, 10);
  }
  if (start < 0) {
    start = await getBlockNumber();
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

router.get('/:hash/txs/', async (req, res) => {
  try {
    const { start, count } = await parseTxParams(req.query);
    const txs = await listBlockTransactions(req.params.hash, start, count);
    res.json({
      txs,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
});

export default router;
