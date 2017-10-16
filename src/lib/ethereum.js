import Web3 from 'web3';
import Promise from 'bluebird';
import config from '../config';

const web3 = new Web3(Web3.givenProviders || config.node || 'http://localhost:8545');

export const getBalance = web3.eth.getBalance;
const getBlock = web3.eth.getBlock;
const getBlockNumber = web3.eth.getBlockNumber;
const getBlockTransactionCount = web3.eth.getBlockTransactionCount;
export const getCoinbase = web3.eth.getCoinbase;
export const getGasPrice = web3.eth.getGasPrice;
export const getHashrate = web3.eth.getHashrate;
export const getMining = web3.eth.isMining;
const getTransaction = web3.eth.getTransaction;
export const getTransactionCount = web3.eth.getTransactionCount;
const getTransactionReceipt = web3.eth.getTransactionReceipt;
export const getTransactionFromBlock = web3.eth.getTransactionFromBlock;

export function getLatestBlock() {
  return getBlockNumber();
}

export async function getBlockInfo(hash) {
  const block = await getBlock(hash);
  if (!block) {
    throw new Error(`Invalid block ${hash}`);
  }
  return block;
}

export function getPendingTransactions() {
  return [];
}

export async function getTransactionInfo(txid) {
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
  return tx;
}

export default {
  getBalance,
  getBlockInfo,
  getBlockTransactionCount,
  getCoinbase,
  getGasPrice,
  getHashrate,
  getLatestBlock,
  getMining,
  getPendingTransactions,
  getTransactionCount,
  getTransactionInfo,
  getTransactionFromBlock,
};
