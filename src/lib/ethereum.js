import Web3 from 'web3';
import LRU from 'lru-cache';

const web3 = new Web3();

export const getBalance = web3.eth.getBalance;
const web3getBlock = web3.eth.getBlock;
export const getBlockNumber = web3.eth.getBlockNumber;
export const getBlockTransactionCount = web3.eth.getBlockTransactionCount;
const web3getCode = web3.eth.getCode;
export const getCoinbase = web3.eth.getCoinbase;
export const getGasPrice = web3.eth.getGasPrice;
export const getHashrate = web3.eth.getHashrate;
export const getMining = web3.eth.isMining;
const web3getTransaction = web3.eth.getTransaction;
export const getTransactionCount = web3.eth.getTransactionCount;
const web3getTransactionReceipt = web3.eth.getTransactionReceipt;
export const getTransactionFromBlock = web3.eth.getTransactionFromBlock;

export function getPendingTransactions() {
  return [];
}

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

export function initialize(config) {
  web3.setProvider(new Web3.providers.HttpProvider(config.rpcnode || 'http://localhost:8545'));
}
// Can query by number or hash, but only cache by hash
export const getBlock = makeCachedQuery(web3getBlock, 50, (hashOrNumber, block) => block.hash);

export const getCode = makeCachedQuery(web3getCode, 20);

export const getTransaction = makeCachedQuery(web3getTransaction, 50);

export const getTransactionReceipt = makeCachedQuery(web3getTransactionReceipt, 50);

export default {
  getBalance,
  getBlockNumber,
  getBlockTransactionCount,
  getCode,
  getCoinbase,
  getGasPrice,
  getHashrate,
  getMining,
  getPendingTransactions,
  getTransactionCount,
  getTransactionFromBlock,
  initialize,
};
