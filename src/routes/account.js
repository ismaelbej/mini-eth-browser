import express from 'express';
import Promise from 'bluebird';
import {
  getBalance,
  getTransactionCount,
} from '../lib/ethereum';

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

export default router;
