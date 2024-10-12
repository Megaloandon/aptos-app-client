import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/apis';
import { CONTRACT_VIEWS, QUERY_KEYS } from '@/constants';

export const useGetExchangeNumbersOffersNFTQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.EX_GET_NUMBERS_OFFERS_NFT],
    queryFn: async () => {
      const client = getApiClient();

      const { data: response } = await client.post(
        '/view',
        {
          function: CONTRACT_VIEWS.EX_GET_NUMBERS_OFFER_NFT,
          type_arguments: [],
          arguments: [],
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
