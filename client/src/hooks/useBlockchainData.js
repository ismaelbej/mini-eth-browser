import { useState, useEffect } from 'react';
import { getBlockchainInfo } from '../lib/api';

export const useBlockchainData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      try {
        setLoading(true);
        const result = await getBlockchainInfo();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockchainData();
    
    // Optional: Set up polling for real-time updates
    const interval = setInterval(fetchBlockchainData, 10000); // Poll every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}; 