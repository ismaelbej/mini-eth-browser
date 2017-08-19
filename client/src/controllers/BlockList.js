import { EventEmitter } from 'events';
import {
  getBlockchainInfo,
  getBlockList,
} from '../lib/api';

const BLOCK_COUNT = 20;

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
      await this.loadBlockList(start || blockchain.blockNumber,
        count || BLOCK_COUNT);
    } catch (err) {
      this.emit('fail', err);
    }
  }

  async loadBlockList(start, count) {
    try {
      if (!count) {
        // eslint-disable-next-line no-param-reassign
        count = BLOCK_COUNT;
      }
      const { blocks } = await getBlockList(start, count || this.blockchain.blockNumber);
      let nextBlock;
      if (blocks.length > 0 && blocks[0].number >= count) {
        nextBlock = blocks[0].number - count;
      }
      let prevBlock;
      if (blocks.length > 0 && blocks[0].number + count <= this.blockchain.blockNumber) {
        prevBlock = blocks[0].number + count;
      }
      this.emit('blocks', {
        blocks,
        nextBlock,
        prevBlock,
      });
    } catch (err) {
      this.emit('fail', err);
    }
  }
}

export default BlockListController;
