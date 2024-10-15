import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/apis';
import { CONTRACT_VIEWS, QUERY_KEYS } from '@/constants';

interface IGetLenderInformationProps {
  lenderAddress: string;
}

export const useGetLendingPoolLenderInformationQuery = (props: IGetLenderInformationProps) => {
  const { lenderAddress } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.LP_GET_LENDER_INFORMATION, lenderAddress],
    queryFn: async () => {
      const client = getApiClient();

      const { data: response } = await client.post(
        '/view',
        {
          function: CONTRACT_VIEWS.LP_GET_LENDER_INFORMATION,
          type_arguments: [],
          arguments: [lenderAddress],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response[0];
    },
  });
};
