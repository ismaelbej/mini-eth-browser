import fetch from 'unfetch';

class Block {
  constructor(blockInfo) {
    this.block = blockInfo;
  }
};

export async function getBlockInfo(hash) {
  const blockInfo = await fetch(`http://localhost:3001/api/v1/block/${hash}`)
    .then(r => r.json());
  return new Block(blockInfo.block);
}

export default Block;
