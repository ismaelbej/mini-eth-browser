import express from 'express';
import {
  getTransactionInfo,
  listTransactions,
} from '../controllers/Transactions';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const txs = await listTransactions();
    res.json({
      txs,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
});

router.get('/:txid', async (req, res) => {
  try {
    const tx = await getTransactionInfo(req.params.txid);
    res.json({
      tx,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
});

export default router;
