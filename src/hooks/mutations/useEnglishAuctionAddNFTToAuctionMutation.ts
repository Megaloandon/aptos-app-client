import { type InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';

import { aptosClient } from '@/aptos';
import { useToast } from '@/components/ui/use-toast';
import { CONTRACT_FUNCTIONS, MEGA_COIN_DECIMALS } from '@/constants';
import { toDecimals } from '@/lib';

export const useEnglishAuctionAddNFTToAuctionMutation = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();

  interface IEnglishAuctionAddNFTToAuctionProps {
    ownerAddress: string;
    collectionName: string;
    tokenId: string;
    currentDebt: number;
  }

  return useMutation({
    mutationFn: async (props: IEnglishAuctionAddNFTToAuctionProps) => {
      if (!account) {
        toast({
          title: 'Error',
          description: 'Please connect your wallet',
        });
        return;
      }

      const { ownerAddress, collectionName, tokenId, currentDebt } = props;

      const payload: InputGenerateTransactionPayloadData = {
        function: CONTRACT_FUNCTIONS.EA_ADD_NFT_TO_AUCTION,
        functionArguments: [
          ownerAddress,
          collectionName,
          tokenId,
          toDecimals(currentDebt, MEGA_COIN_DECIMALS),
        ],
      };

      const response = await signAndSubmitTransaction({
        sender: account.address,
        data: payload,
      });

      try {
        await aptosClient.waitForTransaction({ transactionHash: response.hash });
        toast({
          title: 'Success',
          description: 'Transaction submitted',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Transaction failed',
        });
      }
    },
  });
};
