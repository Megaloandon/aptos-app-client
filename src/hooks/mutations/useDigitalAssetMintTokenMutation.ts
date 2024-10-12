import { type InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';

import { aptosClient } from '@/aptos';
import { useToast } from '@/components/ui/use-toast';
import { CONTRACT_FUNCTIONS } from '@/constants';

export const useDigitalAssetMintTokenMutation = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();

  interface IDigitalAssetMintTokenProps {
    ownerAddress: string;
    collectionName: string;
    tokenId: string;
    tokenName: string;
    tokenDescription: string;
    tokenUri: string;
  }

  return useMutation({
    mutationFn: async (props: IDigitalAssetMintTokenProps) => {
      if (!account) {
        toast({
          title: 'Error',
          description: 'Please connect your wallet',
        });
        return;
      }

      const {
        ownerAddress = account.address,
        collectionName,
        tokenId,
        tokenName,
        tokenDescription,
        tokenUri,
      } = props;

      const payload: InputGenerateTransactionPayloadData = {
        function: CONTRACT_FUNCTIONS.DA_MINT_TOKEN,
        functionArguments: [
          ownerAddress,
          collectionName,
          tokenId,
          tokenName,
          tokenDescription,
          tokenUri,
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
