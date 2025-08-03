import { useQuery } from '@tanstack/react-query';
import { getBlockList } from '../lib/api';

export const useBlockListQuery = ({ start, count = 20 }) => {
  return useQuery({
    queryKey: ['blocks', start, count],
    queryFn: () => getBlockList(start, count),
    enabled: start !== undefined,
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}; 