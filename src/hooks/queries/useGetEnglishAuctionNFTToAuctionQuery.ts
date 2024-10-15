import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/apis';
import { CONTRACT_VIEWS, QUERY_KEYS } from '@/constants';

interface IGetNFTToAuctionProps {
  indexes: string[];
}

export const useGetEnglishAuctionNFTToAuctionQuery = (props: IGetNFTToAuctionProps) => {
  const { indexes } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.EA_GET_NFT_TO_AUCTION, indexes.join(',')],
    queryFn: async () => {
      const client = getApiClient();
      const responses = await Promise.all(
        indexes.map(async (index) => {
          const { data: response } = await client.post(
            '/view',
            {
              function: CONTRACT_VIEWS.EA_GET_NFT_TO_AUCTION,
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
