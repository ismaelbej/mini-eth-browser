import React, { useState, useEffect } from 'react';
import Blockchain from '../components/BlockchainInfo';
import {
  getBlockInfo,
  getBlockchainInfo,
  subscribe,
} from '../lib/api';


function BlockchainInfo () {
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ blockchain, setBlockchain ] = useState({
    block: {
      number: 0,
      timestamp: 0,
    },
    gasPrice: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { blockchain } = await getBlockchainInfo();
        const { block } = await getBlockInfo(blockchain.blockNumber);
    
        setBlockchain({
          ...blockchain,
          block,
        });
        setLoading(false);
      } catch (ex) {
        setLoading(false);
        setError(ex);
      }
    }

    fetchData();
  }, []);

  return (
    <Blockchain blockchain={blockchain} />
  );
}

export default BlockchainInfo;
