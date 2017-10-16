import express from 'express';
import Promise from 'bluebird';
import {
  getAccountInfo,
} from '../lib/ethereum';

const router = express.Router();

router.get('/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const account = await getAccountInfo(address);
    res.json({
      account,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
});

export default router;
