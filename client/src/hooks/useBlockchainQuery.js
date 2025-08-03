import { useQuery } from '@tanstack/react-query';
import { getBlockchainInfo } from '../lib/api';

export const useBlockchainQuery = () => {
  return useQuery({
    queryKey: ['blockchain'],
    queryFn: getBlockchainInfo,
    refetchInterval: 10000, // Refetch every 10 seconds
    staleTime: 5000, // Consider data stale after 5 seconds
  });
}; 