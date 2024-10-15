import { type InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';

import { aptosClient } from '@/aptos';
import { useToast } from '@/components/ui/use-toast';
import { CONTRACT_FUNCTIONS, MEGA_COIN, MEGA_COIN_DECIMALS } from '@/constants';
import { toDecimals } from '@/lib';

export const useEnglishAuctionPlaceBidMutation = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();

  interface IEnglishAuctionPlaceBidProps {
    collectionName: string;
    tokenId: string;
    bidAmount: number;
    closeModal?: () => void;
  }

  return useMutation({
    mutationFn: async (props: IEnglishAuctionPlaceBidProps) => {
      if (!account) {
        toast({
          title: 'Error',
          description: 'Please connect your wallet',
        });
        return;
      }

      const { collectionName, tokenId, bidAmount, closeModal } = props;

      const payload: InputGenerateTransactionPayloadData = {
        function: CONTRACT_FUNCTIONS.EA_PLACE_BID,
        functionArguments: [collectionName, tokenId, toDecimals(bidAmount, MEGA_COIN_DECIMALS)],
        typeArguments: [MEGA_COIN.MC_COIN_TYPE],
      };

      const response = await signAndSubmitTransaction({
        sender: account.address,
        data: payload,
      });

      try {
        await aptosClient.waitForTransaction({ transactionHash: response.hash });
        closeModal?.();
        toast({
          title: 'Success',
          description: 'Transaction submitted',
        });
      } catch (error) {
        closeModal?.();
        toast({
          title: 'Error',
          description: 'Transaction failed',
        });
      }
    },
  });
};
