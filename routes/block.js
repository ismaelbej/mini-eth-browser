const express = require('express');
const ethereum = require('../lib/ethereum');

const router = express.Router();

router.get('/', function (req, res) {
  res.json({ error: 'Missing block hash' });
});

router.get('/:hash', async function (req, res) {
  try {
    const blockInfo = await ethereum.getBlockInfo(req.params.hash);
    res.json({
      block: blockInfo,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [ err.message ]
    });
  }
});

module.exports = router;
