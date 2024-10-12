import { type InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { aptosClient } from '@/aptos';
import { useToast } from '@/components/ui/use-toast';
import { CONTRACT_FUNCTIONS, MEGA_COIN, MEGA_COIN_DECIMALS, QUERY_KEYS } from '@/constants';
import { toDecimals } from '@/lib';

export const useExchangeAddOfferMutation = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const refetchData = async (closeModal: () => void) => {
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.EX_GET_NUMBER_OFFERS],
    });

    closeModal();
  };
  interface IExchangeAddOfferMutation {
    collectionName: string;
    tokenId: string;
    offerPrice: number;
    offerTime: number;
    closeModal: () => void;
  }

  return useMutation({
    mutationFn: async (props: IExchangeAddOfferMutation) => {
      if (!account) {
        toast({
          title: 'Error',
          description: 'Please connect your wallet',
        });
        return;
      }

      const { collectionName, tokenId, offerPrice, offerTime, closeModal } = props;

      const payload: InputGenerateTransactionPayloadData = {
        function: CONTRACT_FUNCTIONS.EX_ADD_OFFER,
        functionArguments: [
          collectionName,
          tokenId,
          toDecimals(offerPrice, MEGA_COIN_DECIMALS),
          offerTime,
        ],
        typeArguments: [MEGA_COIN.MC_COIN_TYPE],
      };

      const response = await signAndSubmitTransaction({
        sender: account.address,
        data: payload,
      });

      try {
        await aptosClient.waitForTransaction({ transactionHash: response.hash });
        await refetchData(closeModal);
        toast({
          title: 'Success',
          description: 'Transaction submitted',
        });
      } catch (error) {
        await refetchData(closeModal);
        toast({
          title: 'Error',
          description: 'Transaction failed',
        });
      }
    },
  });
};
