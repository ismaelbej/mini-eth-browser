import express from 'express';
import Transactions from '../controllers/Transactions';

const router = express.Router();

router.get('/:txid', async (req, res) => {
  try {
    const tx = await Transactions.get(req.params.txid);
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
