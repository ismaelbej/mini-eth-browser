import express from 'express';
import blockchain from '../controllers/blockchain.js';

export default (web3) => {
  const router = express.Router();

  const { getBlockchainInfo } = blockchain(web3);

  router.get('/', async (req, res) => {
    try {
      const blockchainInfo = await getBlockchainInfo();
      res.json(JSON.stringify(blockchainInfo, (key, value) => typeof value === "bigint" ? value.toString() : value));
    } catch (err) {
      res.status(err.status || 500);
      res.json({
        errors: [err.message],
      });
    }
  });
  
  return router;
}
