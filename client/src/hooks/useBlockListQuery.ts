import { useQuery } from '@tanstack/react-query';
import { getBlockList } from '../lib/api';
import type { BlockListData } from '../types/api';

interface UseBlockListQueryParams {
  start?: number;
  count?: number;
}

export const useBlockListQuery = ({ start, count = 20 }: UseBlockListQueryParams) => {
  return useQuery<BlockListData>({
    queryKey: ['blocks', start, count],
    queryFn: () => getBlockList(start, count),
    enabled: start !== undefined,
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}; 