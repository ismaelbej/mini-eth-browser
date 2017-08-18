import { EventEmitter } from 'events';
import {
  getBlockchainInfo,
  getBlockList,
} from '../lib/api';

const HOME_BLOCK_COUNT = 10;

class HomeController extends EventEmitter {
  async initialize() {
    try {
      const { blockchain } = await getBlockchainInfo();
      this.emit('blockchain', blockchain);
      if (blockchain.blockNumber) {
        const { blocks } = await getBlockList(blockchain.blockNumber, HOME_BLOCK_COUNT);
        this.emit('blocks', blocks);
      }
    } catch (err) {
      this.emit('fail', err);
    }
  }
}

export default HomeController;
