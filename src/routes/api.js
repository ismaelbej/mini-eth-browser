import express from 'express';
import block from './block';
import blockchain from './blockchain';
import tx from './tx';
import account from './account';
import contract from './contract';

const router = express.Router();

router.use('/block', block);
router.use('/blockchain', blockchain);
router.use('/tx', tx);
router.use('/account', account);
router.use('/contract', contract);

export default router;
