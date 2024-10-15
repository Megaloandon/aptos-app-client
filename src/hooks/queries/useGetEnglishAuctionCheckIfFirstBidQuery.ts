import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/apis';
import { CONTRACT_VIEWS, QUERY_KEYS } from '@/constants';

interface IGetBidInformationProps {
  collectionName: string;
  tokenId: string;
}

export const useGetEnglishAuctionCheckIfFirstBidQuery = (props: IGetBidInformationProps) => {
  const { collectionName, tokenId } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.EA_GET_CHECK_IF_FIRST_BID, collectionName, tokenId],
    queryFn: async () => {
      const client = getApiClient();

      const { data: response } = await client.post(
        '/view',
        {
          function: CONTRACT_VIEWS.EA_GET_CHECK_IF_FIRST_BID,
          type_arguments: [],
          arguments: [collectionName, tokenId],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response[0] === 'true';
    },
  });
};
