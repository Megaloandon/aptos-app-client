import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { CoinIcon } from '@/components/icons/coin';
import { APTInput } from '@/components/shared';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { QUERY_KEYS } from '@/constants';
import {
  useEnglishAuctionInitializeWithBidMutation,
  useEnglishAuctionPlaceBidMutation,
} from '@/hooks/mutations';
import { useGetEnglishAuctionCheckIfFirstBidQuery } from '@/hooks/queries';
import { cn, fromDecimals, onValueChange, tryParseInt } from '@/lib';

type PlaceBidModalProps = {
  ownerAddress: string;
  collectionName: string;
  tokenId: string;
  tokenUri: string;
  tokenName: string;
  currentDebt: string;
  firstBidAddress: string;
  firstBidAmount: string;
  currentBidAddress: string;
  currentBidAmount: string;
  winnerAddress: string;
  winnerAmount: string;
  minimumBidAmount: string;
  onClose?: () => void;
};

export const PlaceBidModal = NiceModal.create((props: PlaceBidModalProps) => {
  const modal = useModal();

  const {
    // ownerAddress,
    collectionName,
    tokenId,
    tokenUri,
    tokenName,
    currentDebt,
    // firstBidAddress,
    // firstBidAmount,
    // currentBidAddress,
    currentBidAmount,
    minimumBidAmount,
    onClose,
  } = props;

  const closeModal = () => {
    modal.hide();
    modal.remove();

    onClose?.();
  };

  const { data: isFirstBid } = useGetEnglishAuctionCheckIfFirstBidQuery({
    collectionName,
    tokenId,
  });

  const [bidAmount, setBidAmount] = useState<string>('');

  const placeBidMutation = useEnglishAuctionPlaceBidMutation();

  const placeFirstBidMutation = useEnglishAuctionInitializeWithBidMutation();

  const queryClient = useQueryClient();
  const refetchData = async () => {
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.EA_GET_NUMBER_NFT_TO_AUCTION],
    });
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.EA_GET_NFT_TO_AUCTION],
    });
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_TOKENS],
    });
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.EA_GET_BID_INFORMATION],
    });
  };

  const handlePlaceBid = async () => {
    if (isFirstBid) {
      await placeFirstBidMutation.mutateAsync({
        collectionName,
        tokenId,
        bidAmount: parseFloat(bidAmount),
        closeModal,
      });
    } else {
      await placeBidMutation.mutateAsync({
        collectionName,
        tokenId,
        bidAmount: parseFloat(bidAmount),
        closeModal,
      });
    }
    await refetchData();
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent className="min-w-[960px] rounded-2xl border-b-8 border-primary bg-card p-8 text-lg text-white">
        <div className="">
          <h3 className="text-center text-3xl font-semibold">
            Place <span className="text-secondary"> Bid</span>
          </h3>
          <p className="mt-1 text-center">
            The first bidder will receive the first bid bonus if the borrower redeems his debt
            within <span className="font-bold">24 hours</span>
          </p>
          <div className="flex items-center justify-between">
            <span className="text-center text-3xl font-semibold">{tokenName}</span>
            <div
              className={cn(
                'mt-4 w-fit rounded-full border-2 border-secondary px-2 text-white',
                !isFirstBid && 'hidden'
              )}
            >
              First bid available
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-16">
            <div className="col-span-1">
              <img src={tokenUri} alt="token" className="size-full rounded-xl" />
            </div>
            <div className="col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-start gap-2 ">
                  <p className="text-center font-semibold"> Highest Bid</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="text-2xl font-bold text-primary">
                      {' '}
                      {fromDecimals(parseFloat(currentBidAmount), 6)}
                    </p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-start gap-2 ">
                  <p className="text-center font-semibold"> First Bid Bonus</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="text-2xl font-bold text-secondary"> 2</p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border-2 border-primary px-4 py-2 text-center font-semibold text-white">
                The bid amount must be greater than the debt amount
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-col items-center justify-start gap-2 ">
                  <p className="text-center font-semibold"> Total Debt</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="text-2xl font-bold text-primary">
                      {' '}
                      {fromDecimals(tryParseInt(currentDebt), 6)}
                    </p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-start gap-2 ">
                  <p className="text-center font-semibold"> Minimum Bid</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="text-2xl font-bold text-secondary">
                      {' '}
                      {fromDecimals(tryParseInt(minimumBidAmount), 6)}
                    </p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <APTInput
            value={bidAmount}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => {
              onValueChange(e, setBidAmount);
            }}
            className="mt-8"
          />

          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={handlePlaceBid}
              className="rounded-lg bg-secondary px-8 py-2 font-bold text-black "
            >
              Place your Bid
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});
