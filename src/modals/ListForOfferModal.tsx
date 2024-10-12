import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useExchangeListOfferNFTMutation } from '@/hooks/mutations';

interface ListForOfferModalProps {
  onClose?: () => void;
  ownerAddress: string;
  collectionName: string;
  tokenName: string;
  tokenId: string;
  tokenUri: string;
}

export const ListForOfferModal = NiceModal.create((props: ListForOfferModalProps) => {
  const modal = useModal();

  const { tokenName, tokenId, tokenUri, collectionName, onClose } = props;

  const closeModal = () => {
    modal.hide();
    modal.remove();

    onClose?.();
  };

  const listOfferNFTMutation = useExchangeListOfferNFTMutation();

  const listNFT = async () => {
    await listOfferNFTMutation.mutateAsync({
      collectionName,
      tokenId,
    });
    if (listOfferNFTMutation.isSuccess) {
      closeModal();
    }
  };

  return (
    <div className="flex w-[600px]">
      <Dialog open onOpenChange={closeModal}>
        <DialogContent className="flex min-w-[720px] flex-col gap-6">
          <DialogTitle className="text-center text-3xl font-semibold">
            <span className="text-[#A66AFE]">Listing</span>
          </DialogTitle>
          <div className="flex w-full items-start justify-between gap-16 px-3 pb-3">
            <img src={tokenUri} alt="Token" className="size-56 flex-none rounded-md object-cover" />

            <div className="flex flex-none flex-col items-start justify-start gap-4">
              <span className="text-start text-3xl font-bold">{tokenName}</span>

              <div className="flex w-full flex-col items-center gap-2">
                <span className="text-xl font-light">
                  You have to wait for others
                  <br /> to make offers
                </span>
              </div>

              <Button
                onClick={listNFT}
                className="w-full rounded-xl border-2 border-solid border-[#A66AFE] bg-[#A66AFE]/80 text-white/80 hover:bg-[#A66AFE]/60 focus:bg-[#A66AFE]/60"
              >
                Sell
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});
