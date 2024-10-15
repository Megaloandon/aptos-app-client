import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/apis';
import { CONTRACT_VIEWS, QUERY_KEYS } from '@/constants';

interface IGetBidInformationProps {
  tokenInfos?: {
    collectionName: string;
    tokenId: string;
  }[];
}

export const useGetEnglishAuctionBidInformationQuery = (props: IGetBidInformationProps) => {
  const { tokenInfos } = props;

  return useQuery({
    queryKey: [
      QUERY_KEYS.EA_GET_BID_INFORMATION,
      tokenInfos?.map((tokenInfo) => tokenInfo.collectionName + tokenInfo.tokenId).join(','),
    ],
    queryFn: async () => {
      const client = getApiClient();

      if (!tokenInfos) {
        return [];
      }

      const responses = await Promise.allSettled(
        tokenInfos.map(async (tokenInfo) => {
          const { data: response } = await client.post(
            '/view',
            {
              function: CONTRACT_VIEWS.EA_GET_BID_INFORMATION,
              type_arguments: [],
              arguments: [tokenInfo.collectionName, tokenInfo.tokenId],
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const { data: minBidAmount } = await client.post(
            '/view',
            {
              function: CONTRACT_VIEWS.EA_GET_MINIMUM_BID,
              type_arguments: [],
              arguments: [tokenInfo.collectionName, tokenInfo.tokenId],
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          return {
            currentDebt: response[0],
            firstBidAddress: response[1],
            firstBidAmount: response[2],
            currentBidAddress: response[3],
            currentBidAmount: response[4],
            winnerAddress: response[5],
            winnerAmount: response[6],
            minimumBidAmount: minBidAmount[0],
          };
        })
      );
      const fulfilledResponses = responses.map((response) => {
        if (response.status === 'fulfilled') {
          return response.value;
        }
        return null;
      });
      return fulfilledResponses.filter((response) => response !== null);
    },
  });
};
