import { EventEmitter } from 'events';
import {
  getBlockchainInfo,
  getBlockInfo,
} from '../lib/api';

class BlockInfoController extends EventEmitter {
  constructor() {
    super();
    this.hash = undefined;
    this.blockchain = undefined;
    this.block = undefined;
  }

  async initialize(hash) {
    try {
      const { blockchain } = await getBlockchainInfo();
      this.blockchain = blockchain;
      this.loadBlock(hash);
    } catch (err) {
      this.emit('fail', err);
    }
  }

  async loadBlock(hash) {
    try {
      this.hash = hash;
      const { block } = await getBlockInfo(hash);
      this.block = block;
      const nextBlock = block.number > 0 ? block.number - 1 : false;
      const prevBlock = block.number < this.getLatestBlock() ? block.number + 1 : false;
      this.emit('block', {
        block,
        nextBlock,
        prevBlock,
      });
    } catch (err) {
      this.emit('fail', err);
    }
  }

  getLatestBlock() {
    return this.blockchain ? this.blockchain.blockNumber : 0;
  }
}

export default BlockInfoController;
