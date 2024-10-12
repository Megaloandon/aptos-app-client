import { type InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { aptosClient } from '@/aptos';
import { useToast } from '@/components/ui/use-toast';
import { CONTRACT_FUNCTIONS, MEGA_COIN, QUERY_KEYS } from '@/constants';
import { toU64 } from '@/lib';

export const useExchangeListInstantlyNFTMutation = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const refetchData = async (closeModal: () => void) => {
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_TOKENS],
    });

    closeModal();
  };

  interface IExchangeListInstantlyNFTMutation {
    collectionName: string;
    tokenId: string;
    closeModal: () => void;
  }

  return useMutation({
    mutationFn: async (props: IExchangeListInstantlyNFTMutation) => {
      if (!account) {
        toast({
          title: 'Error',
          description: 'Please connect your wallet',
        });
        return;
      }

      const { collectionName, tokenId, closeModal } = props;

      const payload: InputGenerateTransactionPayloadData = {
        function: CONTRACT_FUNCTIONS.EX_LIST_INSTANTLY_NFT,
        functionArguments: [collectionName, toU64(tokenId)],
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
        // eslint-disable-next-line no-console
        console.log(error);
        await refetchData(closeModal);
        toast({
          title: 'Error',
          description: 'Transaction failed',
        });
      }
    },
  });
};
