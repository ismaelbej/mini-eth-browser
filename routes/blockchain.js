const express = require('express');
const ethereum = require('../lib/ethereum');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const blockNumber = await ethereum.getLatestBlock();
    const gasPrice = await ethereum.getGasPrice();
    res.json({
      blockchain: {
        blockNumber,
        gasPrice,
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
