import fetch from 'unfetch';

export async function getBlockInfo(hash) {
  const { block } = await fetch(`http://localhost:3001/api/v1/block/${hash}`)
    .then(r => r.json());
  return { block };
}

export async function getBlockList(start, count) {
  const { blocks } = await fetch(`http://localhost:3001/api/v1/block/?start=${start}&count=${count}`)
    .then(r => r.json());
  return { blocks };

}

export default {
  getBlockInfo,
  getBlockList,
};
