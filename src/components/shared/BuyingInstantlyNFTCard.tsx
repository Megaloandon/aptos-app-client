import NiceModal from '@ebay/nice-modal-react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  useGetOracleDownPaymentPriceQuery,
  useGetOracleFullPaymentPriceQuery,
} from '@/hooks/queries';
import { cn } from '@/lib';
import { DownPaymentModal, FullPaymentModal } from '@/modals';

interface BuyingInstantlyNFTCardProps {
  tokenName: string;
  tokenId: string;
  tokenUri: string;
  ownerAddress: string;
  collectionName: string;
  className?: string;
}

export const BuyingInstantlyNFTCard = (props: BuyingInstantlyNFTCardProps) => {
  const { tokenName, tokenId, tokenUri, collectionName, ownerAddress, className } = props;

  const { data: downPaymentPrice = 1.4 } = useGetOracleDownPaymentPriceQuery({
    ownerAddress,
    collectionName,
    tokenId,
  });

  const { data: fullPaymentPrice = 3.5 } = useGetOracleFullPaymentPriceQuery({
    ownerAddress,
    collectionName,
    tokenId,
  });

  return (
    <div
      className={cn(
        'flex flex-col w-64 bg-[#2D2E2F] items-start justify-center rounded-2xl border border-solid border-[#D9D9D9] overflow-hidden pb-4',
        className
      )}
    >
      <AspectRatio ratio={1} className="mb-2">
        <img src={tokenUri} alt="Token" className="z-10 size-full rounded-2xl object-cover" />
      </AspectRatio>
      <div className="flex w-full flex-col items-start justify-center gap-2 px-4">
        <span className="text-center text-xl font-bold text-white">{tokenName}</span>
      </div>

      <div className="mt-2 grid w-full grid-cols-2 gap-2 px-4">
        <div className="col-span-1 flex flex-col items-start">
          <span className="text-start text-sm text-white/80">Down Payment</span>
          <div className="flex items-center gap-1">
            <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
            <span className="text-start text-sm text-white">{downPaymentPrice}</span>
          </div>
          <Button
            onClick={() => {
              NiceModal.show(DownPaymentModal, {
                onClose: () => {
                  // eslint-disable-next-line no-console
                  console.log('DownPaymentModal closed');
                },
                tokenUri,
                tokenName,
                tokenId,
                collectionName,
                ownerAddress,
                downPaymentPrice,
              });
            }}
            className="mt-4 h-fit w-full rounded-lg border-2 border-solid border-[#A66AFE] bg-[#A66AFE]/80 p-2 hover:bg-[#A66AFE]/60 focus:bg-[#A66AFE]/60"
          >
            <span className="text-xs text-white/80">Down Payment</span>
          </Button>
        </div>
        <div className="col-span-1 flex flex-col items-end">
          <span className="text-end text-sm text-white/80">Full Payment</span>
          <div className="flex items-end gap-1">
            <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
            <span className="text-end text-sm text-white">{fullPaymentPrice}</span>
          </div>
          <Button
            onClick={() => {
              NiceModal.show(FullPaymentModal, {
                onClose: () => {
                  // eslint-disable-next-line no-console
                  console.log('FullPaymentModal closed');
                },
                tokenUri,
                tokenName,
                tokenId,
                collectionName,
                ownerAddress,
                fullPaymentPrice,
              });
            }}
            className="mt-4 h-fit w-full rounded-lg border-2 border-solid border-[#D1F608] bg-[#D1F608]/80 p-2 hover:bg-[#D1F608]/60 focus:bg-[#D1F608]/60"
          >
            <span className="text-xs text-black/80">Full Payment</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
