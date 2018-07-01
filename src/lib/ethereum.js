import Web3 from 'web3';
import LRU from 'lru-cache';

function makeCachedQuery(query, numItems = 50, getKey = k => k) {
  const cache = LRU(numItems);
  return async (key) => {
    if (cache.has(key)) {
      return cache.get(key);
    }
    const value = await query(key);
    cache.set(getKey(key, value), value);
    return value;
  };
}

class Ethereum {
  constructor() {
    const methods = [
      'getBalance',
      'getBlockNumber',
      'getBlockTransactionCount',
      'getCoinbase',
      'getGasPrice',
      'getHashrate',
      'isMining',
      'getTransactionCount',
      'getTransactionFromBlock',
    ];
    methods.forEach((name) => {
      this[name] = async (...params) => this.web3.eth[name].apply(this.web3.eth, params);
      this[name].bind(this);
    });

    this.getBlock = makeCachedQuery(
      (...params) => this.web3.eth.getBlock(...params),
      50,
      (hashOrNumber, block) => block.hash).bind(this);
    this.getCode = makeCachedQuery(
      (...params) => this.web3.eth.getCode(...params),
      20).bind(this);
    this.getTransaction = makeCachedQuery(
      (...params) => this.web3.eth.getTransaction(...params),
      50).bind(this);
    this.getTransactionReceipt = makeCachedQuery(
      (...params) => this.web3.eth.getTransactionReceipt(...params),
      50).bind(this);
  }
  initialize(config) {
    this.web3 = new Web3(Web3.givenProviders || config.rpcnode || 'http://localhost:8545');
  }
}

export default new Ethereum();
