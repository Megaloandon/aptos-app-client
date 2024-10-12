import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { useGetDigitalAssetTokensDataQuery } from './useGetDigitalAssetTokensDataQuery';
import { useGetExchangeNumbersOffersNFTQuery } from './useGetExchangeNumbersOffersNFTQuery';
import { useGetExchangeOfferNFTQuery } from './useGetExchangeOfferNFTQuery';

export const useGetExchangeAllOfferNFTQuery = () => {
  const { data: numberOfOfferNFT, isLoading: isLoadingNumber } =
    useGetExchangeNumbersOffersNFTQuery();

  const parsedNumberOfOfferNFT = numberOfOfferNFT ? parseInt(numberOfOfferNFT[0]) : 0;

  const indexes = Array.from(Array(parsedNumberOfOfferNFT).keys(), (i) => i.toString());

  const { data: instantlyNFTList, isLoading: isLoadingList } = useGetExchangeOfferNFTQuery({
    indexes,
  });

  const { data: allNFTList = [], isLoading: isLoadingInfo } = useGetDigitalAssetTokensDataQuery({
    tokenInfos: instantlyNFTList?.map((nftInfos) => ({
      collectionName: nftInfos[0],
      tokenId: nftInfos[1],
    })),
  });

  return useQuery({
    queryKey: [QUERY_KEYS.EX_GET_ALL_OFFER_NFT, isLoadingNumber || isLoadingList || isLoadingInfo],
    queryFn: () => {
      if (allNFTList.length === 0) {
        return [];
      }

      return allNFTList;
    },
  });
};
