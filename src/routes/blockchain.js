import express from 'express';
import blockchain from '../controllers/blockchain.js';

const getInfo = ({ getBlockchainInfo }) => async (req, res) => {
  try {
    const blockchainInfo = await getBlockchainInfo();
    res.json(blockchainInfo);
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      errors: [err.message],
    });
  }
}

export default (web3) => {
  const router = express.Router();

  const { getBlockchainInfo } = blockchain(web3);

  router.get('/', getInfo({ getBlockchainInfo }));
  
  return router;
}
