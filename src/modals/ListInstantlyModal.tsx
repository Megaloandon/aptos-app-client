import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useExchangeListInstantlyNFTMutation } from '@/hooks/mutations';

interface ListInstantlyModalProps {
  onClose?: () => void;
  ownerAddress: string;
  collectionName: string;
  tokenName: string;
  tokenId: string;
  tokenUri: string;
  listInstantlyPrice: number;
}

export const ListInstantlyModal = NiceModal.create((props: ListInstantlyModalProps) => {
  const modal = useModal();

  const { tokenName, tokenId, listInstantlyPrice, tokenUri, collectionName, onClose } = props;

  const closeModal = () => {
    modal.hide();
    modal.remove();

    onClose?.();
  };

  const listInstantlyNFTMutation = useExchangeListInstantlyNFTMutation();

  const listNFT = async () => {
    await listInstantlyNFTMutation.mutateAsync({
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
            <span className="text-[#A66AFE]">Sell </span>
            <span className="text-white">Instantly</span>
          </DialogTitle>
          <div className="flex w-full items-start justify-between gap-16 px-3 pb-3">
            <img src={tokenUri} alt="Token" className="size-64 flex-none rounded-md object-cover" />

            <div className="flex flex-none flex-col items-start justify-start gap-4">
              <span className="text-start text-3xl font-bold">{tokenName}</span>

              <div className="flex w-full flex-col items-center gap-2">
                <span className="text-2xl font-light">Receive</span>

                <div className="flex w-full items-center justify-center gap-1 text-[#A66AFE]">
                  <span className="text-4xl">{listInstantlyPrice}</span>
                  <img src="/APT.png" alt="APT" className="mx-1 size-8 rounded-full" />
                </div>

                <span className="text-lg font-light">
                  You will receive instantly 60% of <br /> NFT price
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
