const Web3 = require('web3');

const web3 = new Web3("http://localhost:8545");

function getBlockInfo(block) {
  return web3.eth.getBlock(block);
}

module.exports = {
  getBlockInfo,
};
