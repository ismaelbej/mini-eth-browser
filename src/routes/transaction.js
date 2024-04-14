import express from 'express';
import transactions from '../controllers/transactions.js';

const TX_COUNT = 10;

const getTransactions = ({
  listTransactions,
  getBlockNumber,
}) => async (req, res) => {
  try {
    let { start, count } = parseQueryParams(req.query);
    if (typeof start === 'undefined') {
      start = await getBlockNumber();
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
};

const getTransaction = ({ getTransactionInfo }) => async (req, res) => {
  try {
    const { txid } = req.params;
    const tx = await getTransactionInfo(txid);
    res.json({
      tx,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
};

export default (web3) => {
  const router = express.Router();

  const { getTransactionInfo } = transactions(web3);

  router.get('/:txid', getTransaction({ getTransactionInfo }));

  return router;
};
