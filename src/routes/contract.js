import express from 'express';
//FIXME: Initializaton of contracts is not properly done
import Contracts from '../controllers/Contracts';

const router = express.Router();

router.get('/:address', (req, res) => {
  res.json({
    contract: {
      address: req.params.address,
    },
  });
});

export default router;
