import { useState, useEffect } from 'react';
import { getBlockList, getBlockchainInfo } from '../lib/api';

const BLOCK_COUNT = 20;

export const useBlockList = (start, count = BLOCK_COUNT) => {
  const [data, setData] = useState({
    prevBlock: -1,
    nextBlock: -1,
    count,
    blocks: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlockList = async () => {
      try {
        setLoading(true);
        
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

        setData({
          prevBlock,
          nextBlock,
          start: actualStart,
          count: actualCount,
          blocks: blocks.reverse(),
        });
        
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockList();
  }, [start, count]);

  return { data, loading, error };
}; 