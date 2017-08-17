import { EventEmitter } from 'events';
import {
  getBlockchainInfo,
} from '../lib/api';

class HomeController extends EventEmitter {
  constructor() {
    super();
    this.blockchain = undefined;
  }

  async initialize() {
    const { blockchain } = await getBlockchainInfo();
    this.blockchain = blockchain;
    this.emit('blockchain', blockchain);
  }
}

export default HomeController;
