const express = require('express');

const router = express.Router();

router.get('/:address', (req, res) => {
  res.json({
    contract: {
      address: req.params.address,
    },
  });
});

module.exports = router;
