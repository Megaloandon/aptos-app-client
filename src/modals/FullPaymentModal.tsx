import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useExchangeBuyWithFullPaymentMutation } from '@/hooks/mutations';

interface FullPaymentModalProps {
  onClose?: () => void;
  ownerAddress: string;
  collectionName: string;
  tokenName: string;
  tokenId: string;
  tokenUri: string;
  fullPaymentPrice: number;
}

export const FullPaymentModal = NiceModal.create((props: FullPaymentModalProps) => {
  const modal = useModal();

  const { tokenName, tokenId, collectionName, tokenUri, fullPaymentPrice, onClose } = props;

  const closeModal = () => {
    modal.hide();
    modal.remove();

    onClose?.();
  };
  const buyWithFullPaymentMutation = useExchangeBuyWithFullPaymentMutation();

  const buyNFT = async () => {
    await buyWithFullPaymentMutation.mutateAsync({
      collectionName,
      tokenId,
      closeModal,
    });
  };

  return (
    <div className="flex w-[600px]">
      <Dialog open onOpenChange={closeModal}>
        <DialogContent className="flex min-w-[720px] flex-col gap-6">
          <DialogTitle className="text-center text-3xl font-semibold">
            <span className="text-[#A66AFE]">Full </span>
            <span className="text-white">Payment</span>
          </DialogTitle>
          <div className="flex w-full items-start justify-between gap-20 px-5 pb-3">
            <img src={tokenUri} alt="Token" className="size-56 flex-none rounded-md object-cover" />

            <div className="flex flex-none flex-col items-start justify-start gap-6">
              <span className="text-start text-3xl font-bold">{tokenName}</span>

              <div className="flex w-full flex-col items-center gap-2">
                <span className="text-2xl font-light">Full Payment</span>

                <div className="flex w-full items-center justify-center gap-1 text-[#A66AFE]">
                  <span className="text-4xl">{fullPaymentPrice}</span>
                  <img src="/APT.png" alt="APT" className="mx-1 size-8 rounded-full" />
                </div>
              </div>

              <Button
                onClick={buyNFT}
                className="w-full rounded-xl border-2 border-solid border-[#A66AFE] bg-[#A66AFE]/80 text-white/80 hover:bg-[#A66AFE]/60 focus:bg-[#A66AFE]/60"
              >
                Buy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});
