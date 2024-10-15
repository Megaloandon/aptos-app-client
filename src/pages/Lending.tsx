import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CoinIcon } from '@/components/icons/coin';
import { APTInput } from '@/components/shared';
import { QUERY_KEYS } from '@/constants';
import {
  useLendingPoolBorrowMutation,
  useLendingPoolDepositCollateralMutation,
  useLendingPoolDepositMutation,
  useLendingPoolRepayMutation,
  useLendingPoolWithdrawMutation,
} from '@/hooks/mutations';
import {
  useGetLendingPoolAllCollateralQuery,
  useGetLendingPoolBorrowerInformationQuery,
  useGetLendingPoolLenderInformationQuery,
  useGetLendingPoolMarketConfigurationQuery,
  useTokensQuery,
} from '@/hooks/queries';
import { cn, formatNumber, fromDecimals, onValueChange, tryParseInt } from '@/lib';

const LendingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') ?? 'depositAPT';

  const { account } = useWallet();

  const {
    data: marketConfig = {
      totalDeposit: 1000,
      depositAPY: 1000,
      borrowAPY: 1000,
    },
  } = useGetLendingPoolMarketConfigurationQuery();

  const { data: collaterals = [] } = useGetLendingPoolAllCollateralQuery();

  const {
    data: userBorrowInformation = {
      borrowAmount: '0',
      repaidAmount: '0',
      totalCollateralAmount: '0',
      healthFactor: '0',
      availableToBorrow: '0',
    },
  } = useGetLendingPoolBorrowerInformationQuery({
    borrowerAddress: account?.address || '',
  });

  const { data: userDepositInformation = 0 } = useGetLendingPoolLenderInformationQuery({
    lenderAddress: account?.address || '',
  });

  const [withdrawDepositAmount, setWithdrawDepositAmount] = useState<string>('');
  const [withDrawDepositSelector, setWithdrawDepositSelector] = useState<string>('deposit');

  const withdrawMutation = useLendingPoolWithdrawMutation();
  const depositMutation = useLendingPoolDepositMutation();

  const queryClient = useQueryClient();

  const refetchAllData = async () => {
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.LP_GET_MARKET_CONFIGURATION],
    });
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.LP_GET_COLLATERAL_NUMBERS],
    });
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.LP_GET_BORROWER_INFORMATION],
    });
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.LP_GET_LENDER_INFORMATION],
    });
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_TOKENS],
    });
  };

  const handleWithdraw = async () => {
    await withdrawMutation.mutateAsync({
      amount: tryParseInt(withdrawDepositAmount),
    });
    await refetchAllData();
  };

  const handleDeposit = async () => {
    await depositMutation.mutateAsync({
      amount: tryParseInt(withdrawDepositAmount),
    });
    await refetchAllData();
  };

  const { data: userNFTList = [] } = useTokensQuery();

  const [selectedNFTs, setSelectedNFTs] = useState<Array<boolean>>(
    Array.from({ length: userNFTList.length }, () => false)
  );

  const handleSelectNFT = (index: number) => {
    const newSelectedNFTs = [...selectedNFTs];
    newSelectedNFTs[index] = !newSelectedNFTs[index];
    setSelectedNFTs(newSelectedNFTs);
  };

  const depositNFTMutation = useLendingPoolDepositCollateralMutation();

  const handleDepositNFT = async () => {
    await Promise.all(
      selectedNFTs.map(async (isSelected, index) => {
        if (isSelected) {
          await depositNFTMutation.mutateAsync({
            collectionName: userNFTList[index].collectionName,
            tokenId: userNFTList[index].tokenId,
          });
        }
      })
    );
    await refetchAllData();
  };

  const [borrowRepayAmount, setBorrowRepayAmount] = useState<string>('');
  const [borrowRepaySelector, setBorrowRepaySelector] = useState<string>('borrow');
  const borrowMutation = useLendingPoolBorrowMutation();
  const repayMutation = useLendingPoolRepayMutation();

  const handleBorrow = async () => {
    await borrowMutation.mutateAsync({
      amount: tryParseInt(borrowRepayAmount),
    });
    await refetchAllData();
  };

  const handleRepay = async () => {
    await repayMutation.mutateAsync({
      amount: tryParseInt(borrowRepayAmount),
    });
    await refetchAllData();
  };

  return (
    <div>
      <div className="min-h-screen w-full bg-[url('/bg.png')] bg-cover bg-center px-32 pt-28 text-lg">
        <div className="grid grid-cols-4 gap-8 font-prototype text-xl tracking-wider text-white ">
          <div className="col-span-1 h-full rounded-xl bg-[#2E2733] p-4">
            <div className="flex items-center justify-start gap-3">
              <p className="text-3xl text-primary">
                {' '}
                {userBorrowInformation.totalCollateralAmount}
              </p>
              <div className="size-8">
                <CoinIcon />
              </div>
            </div>
            <p className="mt-2"> Total Collateral Amount</p>
          </div>
          <div className="col-span-1 h-full rounded-xl bg-card p-4 ">
            <div className="flex items-center justify-start gap-3">
              <p className="text-3xl text-primary">
                {' '}
                {formatNumber(fromDecimals(userBorrowInformation.borrowAmount, 6))}
              </p>
              <div className="size-8">
                <CoinIcon />
              </div>
            </div>
            <p className="mt-2"> Borrowed Amount</p>
          </div>
          <div className="col-span-1 h-full rounded-xl bg-card p-4">
            <div className="flex items-center justify-start gap-3">
              <p className="text-3xl text-primary">
                {' '}
                {formatNumber(fromDecimals(userDepositInformation, 6))}
              </p>
              <div className="size-8">
                <CoinIcon />
              </div>
            </div>
            <p className="mt-2"> Deposited amount </p>
          </div>
          <div className="col-span-1 h-full rounded-xl bg-card p-4">
            <div className="flex items-center justify-start gap-3">
              <p className="text-3xl text-secondary  ">
                {' '}
                {fromDecimals(userBorrowInformation.availableToBorrow, 6)}
              </p>
              <div className="size-8">
                <CoinIcon />
              </div>
            </div>
            <p className="mt-2"> Available to borrow</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end font-prototype tracking-widest">
          <p className="text-2xl text-white">
            Health Factor:{' '}
            <span className="text-secondary">
              {fromDecimals(userBorrowInformation.healthFactor, 6)}
            </span>
          </p>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-12 text-xl">
          <div className="col-span-1 flex h-full flex-col items-start justify-start gap-8 p-4 font-prototype text-2xl tracking-wider">
            <button
              className={
                view === 'depositAPT' ? 'text-secondary ' : 'text-white hover:text-secondary'
              }
              onClick={() => setSearchParams({ view: 'depositAPT' })}
            >
              Deposit APT
            </button>
            <button
              className={
                view === 'depositNFT' ? 'text-secondary' : 'text-white hover:text-secondary'
              }
              onClick={() => setSearchParams({ view: 'depositNFT' })}
            >
              Deposit Collateral
            </button>
            <button
              className={
                view === 'borrowAPT' ? 'text-secondary' : 'text-white hover:text-secondary'
              }
              onClick={() => setSearchParams({ view: 'borrowAPT' })}
            >
              Borrow APT
            </button>
          </div>
          <div className="col-span-3 size-full rounded-2xl border-b-8 border-primary bg-card p-8 text-lg text-white">
            <div className={view === 'depositAPT' ? 'block' : 'hidden'}>
              <h3 className="text-center font-prototype text-3xl">
                Enter <span className="text-primary"> deposit amount</span>
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-start gap-2 text-2xl">
                  <p className="text-center font-semibold"> Total deposited</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="font-bold text-primary">
                      {' '}
                      {fromDecimals(userDepositInformation, 6)}
                    </p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-start gap-2 text-2xl">
                  <p className="text-center font-semibold"> Deposit APR</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="font-bold text-secondary">
                      {' '}
                      {fromDecimals(marketConfig.depositAPY, 4)}%
                    </p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-start gap-8 font-prototype text-xl">
                <button
                  onClick={() => setWithdrawDepositSelector('deposit')}
                  className={cn(
                    'rounded-full border-2 px-6 py-2',
                    withDrawDepositSelector === 'deposit'
                      ? 'border-secondary text-secondary'
                      : 'border-transparent text-white hover:text-secondary'
                  )}
                >
                  Deposit
                </button>
                <button
                  onClick={() => setWithdrawDepositSelector('withdraw')}
                  className={cn(
                    'rounded-full border-2 px-6 py-2',
                    withDrawDepositSelector === 'withdraw'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-white hover:text-primary'
                  )}
                >
                  Withdraw
                </button>
              </div>
              <APTInput
                className="mt-10"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  onValueChange(e, setWithdrawDepositAmount);
                }}
                value={withdrawDepositAmount}
              />

              <div className="mt-8 flex items-center justify-center">
                <button
                  onClick={async () => {
                    if (withDrawDepositSelector === 'deposit') {
                      await handleDeposit();
                    } else {
                      await handleWithdraw();
                    }
                  }}
                  className={cn(
                    'rounded-lg  px-8 py-2 font-bold text-black',
                    withDrawDepositSelector === 'deposit' ? 'bg-secondary' : 'bg-primary'
                  )}
                >
                  {withDrawDepositSelector === 'deposit' ? 'Deposit' : 'Withdraw'}
                </button>
              </div>
            </div>
            <div className={view === 'depositNFT' ? 'block' : 'hidden'}>
              <h3 className="text-center font-prototype text-3xl">
                Select <span className="text-primary">NFT</span> Collaterals
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-start gap-2 text-2xl">
                  <p className="text-center font-normal">Total collateral</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="font-bold text-primary"> {collaterals.length}</p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-start gap-2 text-2xl">
                  <p className="text-center font-normal">Available to borrow</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="font-bold text-primary">
                      {' '}
                      {fromDecimals(userBorrowInformation.availableToBorrow, 6)}
                    </p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 px-12">
                <table className="w-full ">
                  <thead>
                    <tr className="border-b-2 border-white">
                      <th className="w-1/4 border-r-2 border-white"></th>
                      <th className="w-1/4 border-r-2 border-white py-2 text-center font-normal">
                        Image
                      </th>
                      <th className="w-1/2 font-normal">NFT Token</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userNFTList.map((nft, index) => {
                      return (
                        <tr key={nft.tokenId + nft.collectionName}>
                          <td className="border-r-2 border-white py-4">
                            <div className="flex justify-center">
                              <button
                                onClick={() => {
                                  handleSelectNFT(index);
                                }}
                                type="button"
                                className={cn(
                                  'size-8 rounded-full flex items-center justify-center',
                                  selectedNFTs[index] ? 'bg-[#3F3F3F]' : 'bg-[#D9D9D9]'
                                )}
                              >
                                <img
                                  src="/Tick.svg"
                                  className={cn('size-8', !selectedNFTs[index] && 'hidden')}
                                />
                              </button>
                            </div>
                          </td>
                          <td className="border-r-2 border-white py-4">
                            <div className="flex justify-center">
                              <img src={nft.tokenUri} alt="NFT" className="size-32 object-cover" />
                            </div>
                          </td>
                          <td className="py-4 text-center">{nft.tokenName}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <button
                  onClick={handleDepositNFT}
                  className="rounded-lg bg-secondary px-8 py-2 font-bold text-black "
                >
                  Deposit
                </button>
              </div>
            </div>
            <div className={view === 'borrowAPT' ? 'block' : 'hidden'}>
              <h3 className="text-center font-prototype text-3xl">
                Enter <span className="text-primary"> borrow amount</span>
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-start gap-2 text-xl">
                  <p className="text-center "> Borrowed amount</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="font-bold text-primary"> {userBorrowInformation.borrowAmount}</p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-start gap-2 text-xl">
                  <p className="text-center ">
                    {'Borrow APR: '}
                    <span className="font-bold text-secondary">
                      {fromDecimals(marketConfig.borrowAPY, 4)}%
                    </span>
                  </p>
                  <p className="text-center ">
                    {'Health Factor: '}
                    <span className="font-bold text-secondary">
                      {userBorrowInformation.healthFactor}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-start gap-8 font-prototype text-xl">
                <button
                  onClick={() => setBorrowRepaySelector('borrow')}
                  className={cn(
                    'rounded-full border-2 px-6 py-2',
                    borrowRepaySelector === 'borrow'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-white hover:text-primary'
                  )}
                >
                  Borrow
                </button>
                <button
                  onClick={() => setBorrowRepaySelector('repay')}
                  className={cn(
                    'rounded-full border-2 px-6 py-2',
                    borrowRepaySelector === 'repay'
                      ? 'border-secondary text-secondary'
                      : 'border-transparent text-white hover:text-secondary'
                  )}
                >
                  Repay
                </button>
              </div>

              <APTInput
                className="mt-10"
                value={borrowRepayAmount}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  onValueChange(e, setBorrowRepayAmount);
                }}
              />
              <div className="mt-8 flex items-center justify-center">
                <button
                  onClick={async () => {
                    if (borrowRepaySelector === 'borrow') {
                      await handleBorrow();
                    } else {
                      await handleRepay();
                    }
                  }}
                  className={cn(
                    'rounded-lg  px-8 py-2 font-bold text-black',
                    borrowRepaySelector === 'borrow' ? 'bg-primary' : 'bg-secondary'
                  )}
                >
                  {borrowRepaySelector === 'borrow' ? 'Borrow' : 'Repay'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LendingPage;
