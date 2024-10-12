import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/apis';
import { CONTRACT_VIEWS, QUERY_KEYS } from '@/constants';

interface IGetExchangeOfferNFTProps {
  indexes: string[];
}

export const useGetExchangeOfferNFTQuery = (props: IGetExchangeOfferNFTProps) => {
  const { indexes } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.EX_GET_OFFER_NFT, indexes],
    queryFn: async () => {
      const client = getApiClient();

      const responses = await Promise.all(
        indexes.map(async (index) => {
          const { data: response } = await client.post(
            '/view',
            {
              function: CONTRACT_VIEWS.EX_GET_OFFER_NFT,
              type_arguments: [],
              arguments: [index],
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          return response;
        })
      );
      return responses;
    },
  });
};
