import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { useGetDigitalAssetTokensDataQuery } from './useGetDigitalAssetTokensDataQuery';
import { useGetEnglishAuctionBidInformationQuery } from './useGetEnglishAuctionBidInformationQuery';
import { useGetEnglishAuctionNFTToAuctionQuery } from './useGetEnglishAuctionNFTToAuctionQuery';
import { useGetEnglishAuctionNumbersNFTToAuctionQuery } from './useGetEnglishAuctionNumbersNFTToAuctionQuery';

export const useGetEnglishAuctionAllNFTToAuctionQuery = () => {
  const { data: numberOfAuctionNFT, isLoading: isLoadingNumber } =
    useGetEnglishAuctionNumbersNFTToAuctionQuery();

  const parsedNumberOfAuctionNFT = numberOfAuctionNFT ? parseInt(numberOfAuctionNFT[0]) : 0;

  const indexes = Array.from(Array(parsedNumberOfAuctionNFT).keys(), (i) => i.toString());

  const { data: auctionNFTList, isLoading: isLoadingList } = useGetEnglishAuctionNFTToAuctionQuery({
    indexes,
  });

  const { data: allNFTList = [], isLoading: isLoadingInfo } = useGetDigitalAssetTokensDataQuery({
    tokenInfos: auctionNFTList?.map((nftInfos) => ({
      collectionName: nftInfos[0],
      tokenId: nftInfos[1],
    })),
  });

  const { data: bidInfoExtraData = [], isLoading: isLoadingExtraData } =
    useGetEnglishAuctionBidInformationQuery({
      tokenInfos: auctionNFTList?.map((nftInfos) => ({
        collectionName: nftInfos[0],
        tokenId: nftInfos[1],
      })),
    });

  return useQuery({
    queryKey: [
      QUERY_KEYS.EA_GET_ALL_NFT_TO_AUCTION,
      isLoadingNumber || isLoadingList || isLoadingInfo || isLoadingExtraData,
    ],
    queryFn: () => {
      if (allNFTList.length === 0) {
        return [];
      }

      return allNFTList.map((nft, index) => ({
        ...nft,
        ...bidInfoExtraData[index],
      }));
    },
  });
};
