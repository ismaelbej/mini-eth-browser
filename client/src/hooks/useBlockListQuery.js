import { useQuery } from '@tanstack/react-query';
import { getBlockList, getBlockchainInfo } from '../lib/api';

const BLOCK_COUNT = 20;

export const useBlockListQuery = (start, count = BLOCK_COUNT) => {
  return useQuery({
    queryKey: ['blocks', start, count],
    queryFn: async () => {
      // Get blockchain info to determine current block number
      const { blockchain } = await getBlockchainInfo();
      
      let actualStart = start;
      let actualCount = count;
      
      if (typeof actualCount !== "number") {
        actualCount = BLOCK_COUNT;
      }

      if (typeof actualStart !== "number") {
        actualStart = blockchain.blockNumber - actualCount + 1;
      }
      
      if (actualStart < 0) {
        actualStart = 0;
      }

      const { blocks } = await getBlockList(actualStart, actualCount);

      const prevBlock = blocks.length > 0 && blocks[0].number >= BLOCK_COUNT ?
          blocks[0].number - BLOCK_COUNT : -1;
      const nextBlock = blocks.length > 0 && blocks[blocks.length - 1].number + 1 <= blockchain.blockNumber ?
          blocks[blocks.length - 1].number + 1 : -1;

      return {
        prevBlock,
        nextBlock,
        start: actualStart,
        count: actualCount,
        blocks: blocks.reverse(),
      };
    },
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}; 