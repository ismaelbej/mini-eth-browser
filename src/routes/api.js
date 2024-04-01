import express from 'express';
import blockchain from './blockchain.js';

export default (web3) => { 
  const router = express.Router();

  router.use('/blockchain', blockchain(web3));
  
  return router;
}
