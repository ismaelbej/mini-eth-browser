import fetch from 'unfetch';
import { writeUrl } from '../utils/urlParams';

export async function getBlockInfo(hash) {
  const { block } = await fetch(writeUrl(`http://localhost:3001/api/v1/block/${hash}`))
    .then(r => r.json());
  return { block };
}

export async function getBlockList(start, count) {
  const { blocks } = await fetch(writeUrl('http://localhost:3001/api/v1/block/', { start, count }))
    .then(r => r.json());
  return { blocks };
}

export default {
  getBlockInfo,
  getBlockList,
};
