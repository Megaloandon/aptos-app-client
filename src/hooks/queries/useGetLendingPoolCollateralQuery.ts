import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/apis';
import { CONTRACT_VIEWS, QUERY_KEYS } from '@/constants';

interface IGetCollateralProps {
  ownerAddress: string;
  indexes: string[];
}

export const useGetLendingPoolCollateralQuery = (props: IGetCollateralProps) => {
  const { ownerAddress, indexes } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.LP_GET_COLLATERAL, ownerAddress, indexes.join(',')],
    queryFn: async () => {
      const client = getApiClient();

      const responses = await Promise.all(
        indexes.map(async (index) => {
          const { data: response } = await client.post(
            '/view',
            {
              function: CONTRACT_VIEWS.LP_GET_COLLATERAL,
              type_arguments: [],
              arguments: [ownerAddress, index],
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          return {
            collectionName: response[0],
            tokenId: response[1],
          };
        })
      );
      return responses;
    },
  });
};
