import { type InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';

import { aptosClient } from '@/aptos';
import { useToast } from '@/components/ui/use-toast';
import { CONTRACT_FUNCTIONS } from '@/constants';

export const useDigitalAssetCreateCollectionMutation = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();

  interface IDigitalAssetCreateCollectionProps {
    collectionName: string;
    collectionDescription: string;
    collectionUri: string;
    collectionMaxSupply: number;
  }

  return useMutation({
    mutationFn: async (props: IDigitalAssetCreateCollectionProps) => {
      if (!account) {
        toast({
          title: 'Error',
          description: 'Please connect your wallet',
        });
        return;
      }

      const {
        collectionName,
        collectionDescription,
        collectionUri,
        collectionMaxSupply = 1,
      } = props;

      const payload: InputGenerateTransactionPayloadData = {
        function: CONTRACT_FUNCTIONS.DA_CREATE_COLLECTION,
        functionArguments: [
          collectionDescription,
          collectionMaxSupply,
          collectionName,
          collectionUri,
        ],
      };

      const { data: response } = await signAndSubmitTransaction({
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
