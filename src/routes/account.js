const express = require('express');
const Promise = require('bluebird');
const {
  getBalance,
  getTransactionCount,
} = require('../lib/ethereum');

const router = express.Router();

router.get('/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const [balance, transactionCount] = await Promise.all([
      getBalance(address),
      getTransactionCount(address),
    ]);
    res.json({
      account: {
        address,
        balance,
        transactionCount,
      },
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
});

module.exports = router;
