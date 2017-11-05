import express from 'express';
import {
  getAccountInfo,
} from '../controllers/Accounts';

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
