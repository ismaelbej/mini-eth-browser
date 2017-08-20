import { EventEmitter } from 'events';
import {
  getBlockInfo,
} from '../lib/api';

class BlockListController extends EventEmitter {
  constructor() {
    super();
    this.hash = undefined;
    this.block = undefined;
  }

  async loadBlock(hash) {
    try {
      this.hash = hash;
      const { block } = await getBlockInfo(hash);
      this.block = block;
      this.emit('block', block);
    } catch (err) {
      this.emit('fail', err);
    }
  }
}

export default BlockListController;
