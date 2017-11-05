import express from 'express';
import {
  getBlock,
  getGasPrice,
  getCoinbase,
  getHashrate,
  getMining,
} from '../lib/ethereum';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [block,
      coinbase,
      gasPrice,
      hashrate,
      mining,
    ] = await Promise.all([
      getBlock('latest'),
      getCoinbase(),
      getGasPrice(),
      getHashrate(),
      getMining(),
    ]);
    res.json({
      blockchain: {
        blockNumber: block.number,
        block,
        coinbase,
        gasPrice,
        hashrate,
        mining,
      },
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
});

export default router;
