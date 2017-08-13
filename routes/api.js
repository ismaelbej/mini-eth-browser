const express = require('express');
const block = require('./block');
const blockchain = require('./blockchain');
const tx = require('./tx');
const account = require('./account');
const contract = require('./contract');

const router = express.Router();

router.use('/block', block);
router.use('/blockchain', blockchain);
router.use('/tx', tx);
router.use('/account', account);
router.use('/contract', contract);

module.exports = router;
