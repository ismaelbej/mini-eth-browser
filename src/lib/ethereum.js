import Web3 from 'web3';
import Promise from 'bluebird';
import config from '../config';

const web3 = new Web3(Web3.givenProviders || config.rpcnode || 'http://localhost:8545');

export const getBalance = web3.eth.getBalance;
export const getBlock = web3.eth.getBlock;
const getBlockNumber = web3.eth.getBlockNumber;
export const getBlockTransactionCount = web3.eth.getBlockTransactionCount;
export const getCode = web3.eth.getCode;
export const getCoinbase = web3.eth.getCoinbase;
export const getGasPrice = web3.eth.getGasPrice;
export const getHashrate = web3.eth.getHashrate;
export const getMining = web3.eth.isMining;
export const getTransaction = web3.eth.getTransaction;
export const getTransactionCount = web3.eth.getTransactionCount;
export const getTransactionReceipt = web3.eth.getTransactionReceipt;
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

export async function getAccountInfo(address) {
  const [balance, transactionCount, code] = await Promise.all([
    getBalance(address),
    getTransactionCount(address),
    getCode(address),
  ]);
  const account = {
    address,
    balance,
    transactionCount,
  };
  if (code && code !== '0x0') {
    account.code = code;
  }
  return account;
}

export default {
  getAccountInfo,
  getBalance,
  getBlockInfo,
  getBlockTransactionCount,
  getCode,
  getCoinbase,
  getGasPrice,
  getHashrate,
  getLatestBlock,
  getMining,
  getPendingTransactions,
  getTransactionCount,
  getTransactionFromBlock,
};
