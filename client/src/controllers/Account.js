import { EventEmitter } from 'events';
import {
  getAccountInfo,
} from '../lib/api';

class AccountController extends EventEmitter {
  constructor() {
    super();
    this.address = undefined;
    this.account = undefined;
  }

  async initialize(address) {
    try {
      await this.loadAccount(address);
    } catch (err) {
      this.emit('fail', err);
    }
  }

  async loadAccount(address) {
    try {
      this.address = address;
      const { account } = await getAccountInfo(address);
      this.account = account;
      this.emit('account', {
        account,
      });
    } catch (err) {
      this.emit('fail', err);
    }
  }
}

export default AccountController;
