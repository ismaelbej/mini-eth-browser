import { EventEmitter } from 'events';
import {
  getBlockInfo,
  getTransactionList,
} from '../lib/api';

const TX_COUNT = 20;

class TxListController extends EventEmitter {
  constructor() {
    super();
    this.block = undefined;
    this.txs = undefined;
  }

  async initialize(hash, start, count) {
    try {
      await this.loadBlock(hash);
      this.loadTxList(hash, start || 0, count || TX_COUNT);
    } catch (err) {
      this.emit('fail', err);
    }
  }

  async loadBlock(hash) {
    try {
      if (this.hash !== hash) {
        this.hash = hash;
        const { block } = await getBlockInfo(hash);
        this.block = block;
        this.emit('block', block);
      }
    } catch (err) {
      this.emit('fail', err);
    }
  }

  async loadTxList(hash, paramStart, paramCount) {
    try {
      await this.loadBlock(hash);
      const start = paramStart || 0;
      const count = paramCount || TX_COUNT;
      const { txs } = await getTransactionList(hash, start, count);
      const nextTx = start + txs.length < this.getTransactionsLength() ? start + txs.length : false;
      const prevTx = start >= count ? start - count : false;
      this.emit('txs', {
        txs,
        nextTx,
        prevTx,
      });
    } catch (err) {
      this.emit('fail', err);
    }
  }

  getTransactionsLength() {
    return this.block.transactions.length;
  }
}

export default TxListController;
