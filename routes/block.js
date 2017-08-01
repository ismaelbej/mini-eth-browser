const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  res.json({ error: 'Missing block hash' });
});

router.get('/:hash', function (req, res) {
  res.json({
    block: {
      hash: req.params.hash,
    }
  });
});

module.exports = router;
