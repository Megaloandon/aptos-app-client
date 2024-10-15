import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/apis';
import { CONTRACT_VIEWS, QUERY_KEYS } from '@/constants';

interface IGetBorrowerInformationProps {
  borrowerAddress: string;
}

export const useGetLendingPoolBorrowerInformationQuery = (props: IGetBorrowerInformationProps) => {
  const { borrowerAddress } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.LP_GET_BORROWER_INFORMATION, borrowerAddress],
    queryFn: async () => {
      const client = getApiClient();

      const { data: response } = await client.post(
        '/view',
        {
          function: CONTRACT_VIEWS.LP_GET_BORROWER_INFORMATION,
          type_arguments: [],
          arguments: [borrowerAddress],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        borrowAmount: response[0],
        repaidAmount: response[1],
        totalCollateralAmount: response[2],
        healthFactor: response[3],
        availableToBorrow: response[4],
      };
    },
  });
};
