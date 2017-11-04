import {
  getBlock,
  getCode,
  getTransaction,
  getTransactionReceipt,
} from '../lib/ethereum';

class TransactionController {
  // eslint-disable-next-line class-methods-use-this
  async get(txid) {
    try {
      const [tx, receipt] = await Promise.all([
        getTransaction(txid),
        getTransactionReceipt(txid),
      ]);
      const block = receipt ? await getBlock(tx.blockHash) : null;
      if (block) {
        tx.block = block;
      }
      if (receipt) {
        tx.receipt = receipt;
      }
      if (tx.to) {
        const code = await getCode(tx.to);
        if (code && code !== '0x0') {
          tx.code = code;
        }
      }
      return tx;
    } catch (ex) {
      console.log(`${ex.stack}`);
    }
    return {};
  }

  // eslint-disable-next-line class-methods-use-this
  list() {
    return [];
  }
}

export default new TransactionController();
