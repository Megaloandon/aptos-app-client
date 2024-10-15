import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/apis';
import { CONTRACT_VIEWS, QUERY_KEYS } from '@/constants';

interface IGetCollateralNumbersProps {
  ownerAddress: string;
}

export const useGetLendingPoolCollateralNumbersQuery = (props: IGetCollateralNumbersProps) => {
  const { ownerAddress } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.LP_GET_COLLATERAL_NUMBERS, ownerAddress],
    queryFn: async () => {
      const client = getApiClient();

      const { data: response } = await client.post(
        '/view',
        {
          function: CONTRACT_VIEWS.LP_GET_COLLATERAL_NUMBERS,
          type_arguments: [],
          arguments: [ownerAddress],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response;
    },
  });
};
