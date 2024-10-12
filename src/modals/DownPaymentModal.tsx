import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useExchangeBuyWithDownPaymentMutation } from '@/hooks/mutations';

interface DownPaymentModalProps {
  onClose?: () => void;
  ownerAddress: string;
  collectionName: string;
  tokenName: string;
  tokenId: string;
  tokenUri: string;
  downPaymentPrice: number;
}

export const DownPaymentModal = NiceModal.create((props: DownPaymentModalProps) => {
  const modal = useModal();

  const { tokenName, tokenId, collectionName, tokenUri, downPaymentPrice, onClose } = props;

  const closeModal = () => {
    modal.hide();
    modal.remove();

    onClose?.();
  };

  const buyWithDownPaymentMutation = useExchangeBuyWithDownPaymentMutation();

  const buyNFT = async () => {
    await buyWithDownPaymentMutation.mutateAsync({
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
            <span className="text-[#A66AFE]">Down </span>
            <span className="text-white">Payment</span>
          </DialogTitle>
          <div className="flex w-full items-start justify-start gap-20 px-3 pb-3">
            <img src={tokenUri} alt="Token" className="size-56 flex-none rounded-md object-cover" />

            <div className="flex flex-none flex-col items-start justify-start gap-6">
              <span className="text-start text-3xl font-bold">{tokenName}</span>

              <div className="flex w-full flex-col items-center gap-2">
                <span className="text-2xl font-light">Down Payment</span>

                <div className="flex w-full items-center justify-center gap-1 text-[#A66AFE]">
                  <span className="text-4xl">{downPaymentPrice}</span>
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
