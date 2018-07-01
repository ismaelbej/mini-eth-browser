import express from 'express';
import Ethereum from '../lib/ethereum';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [block,
      coinbase,
      gasPrice,
      hashrate,
      mining,
    ] = await Promise.all([
      Ethereum.getBlock('latest'),
      Ethereum.getCoinbase(),
      Ethereum.getGasPrice(),
      Ethereum.getHashrate(),
      Ethereum.isMining(),
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
