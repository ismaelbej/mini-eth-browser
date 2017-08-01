const express = require('express');

const router = express.Router();

router.get('/:hash', function (req, res) {
  res.json({
    tx: {
      hash: req.params.hash,
    }
  });
});

module.exports = router;
