import express from 'express';
import ethereum from '../lib/ethereum';

const router = express.Router();

router.get('/:txid', async (req, res) => {
  try {
    const tx = await ethereum.getTransactionInfo(req.params.txid);
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
