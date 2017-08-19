import { EventEmitter } from 'events';
import {
  getBlockchainInfo,
  getBlockList,
} from '../lib/api';

class BlockListController extends EventEmitter {
  constructor() {
    super();
    this.blockchain = undefined;
  }

  async initialize(start, count) {
    try {
      const { blockchain } = await getBlockchainInfo();
      this.emit('blockchain', blockchain);
      this.blockchain = blockchain;
      if (blockchain.blockNumber) {
        const { blocks } = await getBlockList(blockchain.blockNumber, count);
        this.emit('blocks', blocks);
      }
    } catch (err) {
      this.emit('fail', err);
    }
  }
}

export default BlockListController;
