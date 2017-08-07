const express = require('express');
const _ = require('lodash');
const Promise = require('bluebird');
const ethereum = require('../lib/ethereum');

const router = express.Router();

const BLOCK_COUNT = 25;

router.get('/', async (req, res) => {
  try {
    let start = -1;
    if (typeof req.query.start === 'string') {
      start = parseInt(req.query.start, 10);
    }
    if (start < 0) {
      start = await ethereum.getLatestBlock();
    }
    let count = BLOCK_COUNT;
    if (typeof req.query.count === 'string') {
      count = parseInt(req.query.count, 10);
    }
    if (count <= 0) {
      count = BLOCK_COUNT;
    }

    if (start >= 0) {
      const blocks = await Promise.map(
        _.range(start, _.max([0, start - count]) - 1, -1),
        blk => ethereum.getBlockInfo(blk));
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
    const block = await ethereum.getBlockInfo(req.params.hash);
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

module.exports = router;
