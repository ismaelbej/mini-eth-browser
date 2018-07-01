import express from 'express';
import {
  getTransactionInfo,
  listTransactions,
} from '../controllers/Transactions';
import Ethereum from '../lib/ethereum';
import {
  parseQueryParams,
} from '../lib/utils';

const TX_COUNT = 10;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let { start, count } = parseQueryParams(req.query);
    if (typeof start === 'undefined') {
      start = (await Ethereum.getBlock('latest')).number;
    }
    if (typeof count === 'undefined') {
      count = TX_COUNT;
    }
    const txs = await listTransactions(start, count);
    res.json({
      txs,
      start,
      count,
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
