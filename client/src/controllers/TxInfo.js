import { EventEmitter } from 'events';
import {
  getTransactionInfo,
} from '../lib/api';

class TxInfoController extends EventEmitter {
  constructor() {
    super();
    this.hash = undefined;
    this.tx = undefined;
  }

  async initialize(hash) {
    try {
      await this.loadTransaction(hash);
    } catch (err) {
      this.emit('fail', err);
    }
  }

  async loadTransaction(hash) {
    try {
      this.hash = hash;
      const { tx } = await getTransactionInfo(hash);
      this.tx = tx;
      const nextTx = tx.transactionIndex + 1 < this.getBlockTransactions() ? tx.block.transactions[tx.transactionIndex + 1] : false;
      const prevTx = tx.transactionIndex > 0 ? tx.block.transactions[tx.transactionIndex - 1] :  false;
      this.emit('tx', {
        tx,
        nextTx,
        prevTx,
      });
    } catch (err) {
      this.emit('fail', err);
    }
  }

  getBlockTransactions() {
    return this.tx.block.transactions.length;
  }
}

export default TxInfoController;
