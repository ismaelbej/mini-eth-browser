import express from 'express';
import accounts from './account.js';
import blockchain from './blockchain.js';
import block from './block.js';
import transaction from './transaction.js';

export default (web3) => { 
  const router = express.Router();

  router.use('/address', accounts(web3));
  router.use('/blockchain', blockchain(web3));
  router.use('/block', block(web3));
  router.use('/tx', transaction(web3));
  
  return router;
}
