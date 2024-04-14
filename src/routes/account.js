import express from 'express';
import accounts from '../controllers/accounts.js';

const getAccount = ({ getAccountInfo }) => async (req, res) => {
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
};

export default (web3) => {
  const router = express.Router();

  const { getAccountInfo } = accounts(web3);

  router.get('/:address', getAccount({ getAccountInfo }));

  return router;
};
