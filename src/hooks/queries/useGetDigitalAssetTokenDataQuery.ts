import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/apis';
import { CONTRACT_VIEWS, QUERY_KEYS } from '@/constants';

interface IGetTokenDataProps {
  collectionName: string;
  tokenId: string;
}

export const useGetDigitalAssetTokenDataQuery = (props: IGetTokenDataProps) => {
  const { collectionName, tokenId } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.DA_GET_TOKEN_DATA, collectionName, tokenId],
    queryFn: async () => {
      const client = getApiClient();

      const { data: response } = await client.post(
        '/view',
        {
          function: CONTRACT_VIEWS.DA_GET_TOKEN_DATA,
          type_arguments: [],
          arguments: [collectionName, tokenId],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        tokenName: response[0],
        tokenDescription: response[1],
        tokenUri: response[2],
      };
    },
  });
};
