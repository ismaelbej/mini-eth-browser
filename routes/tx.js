const express = require('express');
const ethereum = require('../lib/ethereum');

const router = express.Router();

const TX_COUNT = 10;

router.get('/', async (req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: [err.message],
  });
});

router.get('/:txid', async (req, res) => {
  try {
    const tx = await ethereum.getTransactionInfo(req.params.txid);
    res.json({
      tx,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
});

module.exports = router;
