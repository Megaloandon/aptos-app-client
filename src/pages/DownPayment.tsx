import { useState } from 'react';

import { CoinIcon } from '@/components/icons/coin';
import { Input } from '@/components/ui/input';
import { useExchangeBuyWithDownPaymentMutation } from '@/hooks/mutations';
import { useGetDigitalAssetTokenDataQuery } from '@/hooks/queries';
import { cn } from '@/lib';

const DownPaymentPage = () => {
  const [selectedMarket, setSelectedMarket] = useState<string>('Blue Move');
  const [selectedStep, setSelectedStep] = useState('1');

  const [collectionName, setCollectionName] = useState<string>('');
  const [tokenId, setTokenId] = useState<string>('');

  const { data: tokenData } = useGetDigitalAssetTokenDataQuery({
    collectionName,
    tokenId,
  });

  const buyWithDownPaymentMutation = useExchangeBuyWithDownPaymentMutation();

  const handleDownPayment = async () => {
    await buyWithDownPaymentMutation.mutateAsync({
      collectionName,
      tokenId,
    });
  };

  return (
    <div className="min-h-screen w-full bg-[url('/bg.png')] bg-cover bg-center p-32 text-lg">
      <h1 className="text-center font-prototype text-[64px] font-semibold text-white">
        Down Payment Buy
      </h1>
      <p className="mt-10 text-center text-3xl font-light">
        Buy NFT in <span className="font-semibold">top NFT marketplace</span> with
        <span className="font-semibold"> down payment</span>
      </p>
      <div className={selectedStep === '1' ? 'mt-12 block' : 'hidden'}>
        <h3 className="text-center font-prototype text-3xl text-secondary">Select Market</h3>

        <div className="mt-12 grid grid-cols-2 items-center px-64">
          <div className="col-span-1 flex flex-col items-center justify-center gap-2 text-2xl">
            <button
              className={
                selectedMarket === 'Blue Move'
                  ? 'rounded-xl border-2 border-white bg-primary p-6 shadow shadow-white'
                  : 'rounded-xl border-2 border-white p-6 text-white shadow shadow-white hover:bg-primary'
              }
              onClick={() => setSelectedMarket('Blue Move')}
            >
              <div className="size-24 rounded-full">
                <img
                  src="/icons/BlueMove_logo.webp"
                  alt="BlueMove"
                  className="size-full rounded-full"
                />
              </div>
            </button>
            <p className="font-semibold">Blue Move</p>
          </div>
          <div className="col-span-1 flex flex-col items-center justify-center gap-2 text-2xl">
            <button
              className={
                selectedMarket === 'Wapal'
                  ? 'rounded-xl border-2 border-white bg-primary p-6 shadow shadow-white'
                  : 'rounded-xl border-2 border-white p-6 text-white shadow shadow-white hover:bg-primary'
              }
              onClick={() => setSelectedMarket('Wapal')}
            >
              <div className="size-24 rounded-full">
                <img src="/icons/wapal.jpeg" alt="Wapal" className="size-full rounded-full" />
              </div>
            </button>
            <p className="font-semibold">Wapal</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            className="rounded-lg bg-gray-300 px-8 py-2 font-bold text-black "
            onClick={() => setSelectedStep('1')}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-secondary px-8 py-2 font-bold text-black "
            onClick={() => setSelectedStep('2')}
          >
            Continue
          </button>
        </div>
      </div>
      <div className={selectedStep === '2' ? 'mt-12 block' : 'hidden'}>
        <h3 className="text-center text-3xl font-semibold">
          Buy from
          <span className=" text-secondary"> {selectedMarket} marketplace</span>
        </h3>

        <div className="mt-12 items-center px-64">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold text-secondary">Collection Name</span>
              <Input
                value={collectionName}
                onChange={(e) => {
                  setCollectionName(e.target.value);
                }}
                className={cn(
                  'rounded-xl border bg-[#27272A] p-8 shadow-lg shadow-primary text-2xl text-white'
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold text-secondary">Token ID</span>
              <Input
                value={tokenId}
                onChange={(e) => {
                  setTokenId(e.target.value);
                }}
                className={cn(
                  'rounded-xl border bg-[#27272A] p-8 shadow-lg shadow-primary text-2xl text-white'
                )}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            className="rounded-lg bg-gray-300 px-8 py-2 font-bold text-black "
            onClick={() => setSelectedStep('1')}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-secondary px-8 py-2 font-bold text-black "
            onClick={() => setSelectedStep('3')}
          >
            Continue
          </button>
        </div>
      </div>

      <div className={selectedStep === '3' ? 'mt-12 block' : 'hidden'}>
        <h3 className="text-center text-3xl font-semibold">
          Buy from
          <span className=" text-secondary"> {selectedMarket} marketplace</span>
        </h3>

        <div className="mt-12 items-center px-64">
          <div className="flex items-start justify-center gap-12">
            <div className="size-48">
              <img
                src={tokenData?.tokenUri}
                alt="avatar"
                className="size-full rounded object-cover"
              />
            </div>
            <div>
              <p className="text-center font-semibold">{tokenData?.tokenName}</p>
              <div className="mt-4">
                <p className="text-center font-light">Down payment</p>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <p className="text-3xl font-bold text-primary">2.3</p>
                  <div className="size-8">
                    <CoinIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            className="rounded-lg bg-gray-300 px-8 py-2 font-bold text-black "
            onClick={() => setSelectedStep('2')}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-secondary px-8 py-2 font-bold text-black "
            onClick={handleDownPayment}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownPaymentPage;
