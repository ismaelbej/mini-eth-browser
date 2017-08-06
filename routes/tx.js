const express = require('express');
const ethereum = require('../lib/ethereum');

const router = express.Router();

const TX_COUNT = 10;

function parseParams(query) {
  let block;
  if (typeof query.block === 'string') {
    if (query.block.length > 0) {
      block = query.block;
    }
  }
  let start = 0;
  if (typeof query.start === 'string') {
    start = parseInt(query.start);
  }
  if (start < 0) {
    start = 0;
  }
  let count = TX_COUNT;
  if (typeof query.count === 'string') {
    count = parseInt(query.count);
  }
  if (count <= 0) {
    count = TX_COUNT;
  }
  return {
    block,
    start,
    count
  };
}

router.get('/', async function (req, res) {
  try {
    const { block, start, count } = parseParams(req.query);
    if (block) {
      const blockInfo = await ethereum.getBlockInfo(block);
      const txids = blockInfo.transactions.slice(start, start + count);
      const txs = await Promise.all(txids.map(ethereum.getTransactionInfo));
      res.json({
        txs
      });
    } else {
      const txs = await ethereum.getPendingTransactions();
      res.json({
        txs
      });
    }
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [ err.message ]
    });
  }
});

router.get('/:txid', async function (req, res) {
  try {
    const tx = await ethereum.getTransactionInfo(req.params.txid);
    res.json({
      tx
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [ err.message ]
    });
  }
});

module.exports = router;
