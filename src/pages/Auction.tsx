import NiceModal from '@ebay/nice-modal-react';

import { useGetEnglishAuctionAllNFTToAuctionQuery } from '@/hooks/queries';
import { fromDecimals } from '@/lib';
import { PlaceBidModal } from '@/modals';

const AuctionPage = () => {
  const { data: AuctionNFTList = [] } = useGetEnglishAuctionAllNFTToAuctionQuery();

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[url('/bg.png')] bg-cover bg-center p-32 text-lg">
      <h1 className="text-left font-prototype text-[38px] tracking-wide text-white">
        Available to Auction
      </h1>
      <div className="mt-20  grid grid-cols-4 gap-12">
        {AuctionNFTList.map((nft) => (
          <div className="col-span-1 flex justify-center" key={nft.tokenId + nft.collectionName}>
            <div className="max-w-64 rounded-xl  border border-solid border-[#D9D9D9] bg-card">
              <div>
                <img
                  src={nft.tokenUri}
                  alt="token"
                  className="size-full rounded-t-xl object-cover"
                />
              </div>
              <div className="px-4 pb-2">
                <h3 className="my-2 text-center text-lg font-bold text-white">{nft.tokenName}</h3>
                <div className="flex items-center justify-between text-base text-white/80">
                  <div className="text-left">
                    <p>Current Debt</p>
                    <div className="flex items-center gap-1">
                      <span className="text-start font-bold">
                        {fromDecimals(nft.currentDebt, 6)}
                      </span>
                      <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p>First Bid Bonus</p>
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-start font-bold">2</span>
                      <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    NiceModal.show(PlaceBidModal, {
                      ownerAddress: nft.ownerAddress,
                      collectionName: nft.collectionName,
                      tokenId: nft.tokenId,
                      tokenUri: nft.tokenUri,
                      tokenName: nft.tokenName,
                      currentDebt: nft.currentDebt,
                      firstBidAddress: nft.firstBidAddress,
                      firstBidAmount: nft.firstBidAmount,
                      currentBidAddress: nft.currentBidAddress,
                      currentBidAmount: nft.currentBidAmount,
                      winnerAddress: nft.winnerAddress,
                      winnerAmount: nft.winnerAmount,
                      minimumBidAmount: nft.minimumBidAmount,
                      onClose: () => {
                        // eslint-disable-next-line no-console
                        console.log('PlaceBidModal closed');
                      },
                    });
                  }}
                  className="mt-2 w-full rounded-lg bg-secondary py-1 text-base font-semibold text-black"
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionPage;
