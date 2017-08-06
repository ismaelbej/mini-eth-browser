const Web3 = require('web3');
const Promise = require('bluebird');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const getBlockNumber = Promise.promisify(web3.eth.getBlockNumber);
const getBlock = Promise.promisify(web3.eth.getBlock);
const getTransaction = Promise.promisify(web3.eth.getTransaction);
const getTransactionReceipt = Promise.promisify(web3.eth.getTransactionReceipt);

function getLatestBlock() {
  return getBlockNumber();
}

function getBlockInfo(block) {
  return getBlock(block);
}

async function getTransactionInfo(txid) {
  const [ tx, receipt ] = await Promise.all([
    getTransaction(txid),
    getTransactionReceipt(txid)
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

module.exports = {
  getLatestBlock,
  getBlockInfo,
  getTransactionInfo,
};
