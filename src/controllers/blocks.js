const range = (start, end, step) => {
  const length = 1 + Math.ceil((end - start) / step);
  return Array.from({ length, }, (_, i) => start + i * step);
};

const getBlockInfo = ({ getBlock }) => async (hash) => {
  const block = await getBlock(hash);
  return block;
};

const listBlocks = ({ getBlockInfo }) => async (start, count) => {
  const blocks = await Promise.all(
    range(start, start + count - 1, 1).map(getBlockInfo),
  );
  return blocks;
}

export default (web3) => ({
  getBlockInfo: getBlockInfo(web3),
  listBlocks: listBlocks({
    getBlockInfo: getBlockInfo(web3),
  }),
});
