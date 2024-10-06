import { useState } from 'react';

import { CoinIcon } from '@/components/icons/coin';
import { Button } from '@/components/ui/button';
import {
  useLendingPoolBorrowMutation,
  useLendingPoolCreateReserveMutation,
  useLendingPoolDepositCollateralMutation,
  useLendingPoolDepositMutation,
  useLendingPoolRepayMutation,
  useLendingPoolWithdrawMutation,
} from '@/hooks/mutations';

const LendingPage = () => {
  const [amountBorrow, setAmountBorrow] = useState(0);
  const borrowMutation = useLendingPoolBorrowMutation();

  const createReserveMutation = useLendingPoolCreateReserveMutation();

  const [collectionCollateralName, setCollectionCollateralName] = useState('');
  const [tokenId, setTokenId] = useState(0);
  const depositCollateralMutation = useLendingPoolDepositCollateralMutation();

  const [amountDeposit, setAmountDeposit] = useState(0);
  const depositMutation = useLendingPoolDepositMutation();

  const [amountRepay, setAmountRepay] = useState(0);
  const repayMutation = useLendingPoolRepayMutation();

  const [amountWithdraw, setAmountWithdraw] = useState(0);
  const withdrawMutation = useLendingPoolWithdrawMutation();
  const [selectedTab, setSelectedTab] = useState('1');
  return (
    <div>
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        <img src="/bg.png" alt="Background" className="absolute -z-10 h-screen w-screen" />
        <div className="container mt-20 flex w-full flex-col overflow-y-scroll p-10">
          <div className="flex w-48 flex-col gap-10">
            <div className="flex flex-col gap-4 ">
              <input
                type="number"
                aria-label="Amount to borrow"
                value={amountBorrow}
                placeholder="Amount to borrow"
                onChange={(e) => setAmountBorrow(parseFloat(e.target.value))}
                className="text-black"
              />
              <Button onClick={() => borrowMutation.mutate({ amount: amountBorrow })}>
                Borrow
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => {
                  createReserveMutation.mutate();
                }}
              >
                Create Reserve
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                aria-label="Collection name"
                value={collectionCollateralName}
                placeholder="Collection name"
                onChange={(e) => {
                  setCollectionCollateralName(e.target.value);
                }}
                className="text-black"
              />
              <input
                type="number"
                value={tokenId}
                placeholder="tokenId"
                aria-label="tokenId"
                onChange={(e) => setTokenId(parseFloat(e.target.value))}
                className="text-black"
              />
              <Button
                onClick={() =>
                  depositCollateralMutation.mutate({
                    collectionName: collectionCollateralName,
                    tokenId,
                  })
                }
              >
                Deposit Collateral
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="number"
                value={amountDeposit}
                placeholder="Amount"
                onChange={(e) => setAmountDeposit(parseFloat(e.target.value))}
                className="text-black"
              />
              <Button onClick={() => depositMutation.mutate({ amount: amountDeposit })}>
                Deposit
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="number"
                value={amountRepay}
                placeholder="Amount"
                onChange={(e) => setAmountRepay(parseFloat(e.target.value))}
                className="text-black"
              />
              <Button onClick={() => repayMutation.mutate({ amount: amountRepay })}>Repay</Button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="number"
                value={amountWithdraw}
                placeholder="Amount"
                onChange={(e) => setAmountWithdraw(parseFloat(e.target.value))}
                className="text-black"
              />
              <Button onClick={() => withdrawMutation.mutate({ amount: amountWithdraw })}>
                Withdraw
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[url('/bg.png')] bg-cover bg-center p-32 text-lg">
        <div className="grid grid-cols-4 gap-12">
          <div className="col-span-1 h-full rounded-xl bg-[#2E2733] p-4 text-lg font-bold text-white">
            <div className="flex items-center justify-start gap-3">
              <p className="text-3xl text-primary"> 1000</p>
              <div className="size-8">
                <CoinIcon />
              </div>
            </div>
            <p className="mt-2 text-lg"> Total Collateral Amount</p>
          </div>

          <div className="col-span-1 h-full rounded-xl bg-card p-4 text-lg font-bold text-white">
            <div className="flex items-center justify-start gap-3">
              <p className="text-3xl text-primary"> 1000</p>
              <div className="size-8">
                <CoinIcon />
              </div>
            </div>
            <p className="mt-2 text-lg"> Borrowed Amount</p>
          </div>

          <div className="col-span-1 h-full rounded-xl bg-card p-4 text-lg font-bold text-white">
            <div className="flex items-center justify-start gap-3">
              <p className="text-3xl text-primary"> 1000</p>
              <div className="size-8">
                <CoinIcon />
              </div>
            </div>
            <p className="mt-2 text-lg"> Deposited amount </p>
          </div>

          <div className="col-span-1 h-full rounded-xl bg-card p-4 text-lg font-bold text-white">
            <div className="flex items-center justify-start gap-3">
              <p className="text-3xl text-secondary  "> 1000</p>
              <div className="size-8">
                <CoinIcon />
              </div>
            </div>
            <p className="mt-2 text-lg"> Available to borrow</p>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end">
          <p className="text-2xl font-semibold text-white">
            Health Factor: <span className="text-secondary">1.12</span>
          </p>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-12 text-xl">
          <div className="col-span-1 flex h-full flex-col items-start justify-start gap-8 p-4 text-2xl font-semibold">
            <button
              className={selectedTab === '1' ? 'text-secondary' : 'text-white'}
              onClick={() => setSelectedTab('1')}
            >
              Deposit APT
            </button>
            <button
              className={selectedTab === '2' ? 'text-secondary' : 'text-white'}
              onClick={() => setSelectedTab('2')}
            >
              Deposit Collateral
            </button>
            <button
              className={selectedTab === '3' ? 'text-secondary' : 'text-white'}
              onClick={() => setSelectedTab('3')}
            >
              Borrow APT
            </button>
          </div>
          <div className="col-span-3 size-full rounded-2xl border-b-8 border-primary bg-card p-8 text-lg text-white">
            <div className={selectedTab === '1' ? 'block' : 'hidden'}>
              <h3 className="text-center text-3xl font-semibold">
                Enter <span className="text-primary"> deposit amount</span>
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-start gap-2 text-2xl">
                  <p className="text-center font-semibold"> Total deposited</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="font-bold text-primary"> 100</p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-start gap-2 text-2xl">
                  <p className="text-center font-semibold"> Deposit APR</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="font-bold text-secondary"> 3.8%</p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-start gap-8 font-semibold">
                <button className="rounded-full border-2 border-primary px-6 py-2 text-primary">
                  {'Withdraw'}
                </button>
                <button className="underline-offset-1"> Deposit</button>
              </div>
              <div className="mt-8 flex items-center justify-between rounded-xl bg-[#484549] px-12 py-4">
                <div className="flex flex-col items-start justify-start gap-2 text-xl">
                  <p className="text-left"> Amount</p>
                  <p className="text-left"> 100</p>
                </div>

                <div className="flex flex-col items-end justify-start gap-2 text-xl">
                  <p className="text-center font-semibold"> Balance: 200</p>
                  <div className="flex items-center justify-start gap-2">
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                    <p> APT</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <button className="rounded-lg bg-secondary px-8 py-2 font-bold text-black ">
                  Deposit
                </button>
              </div>
            </div>
            <div className={selectedTab === '2' ? 'block' : 'hidden'}>
              <h3 className="text-center text-3xl font-semibold">
                Select <span className="text-primary">NFT</span> Collaterals
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-start gap-2 text-2xl">
                  <p className="text-center font-semibold">Total collateral</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="font-bold text-primary"> 80</p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-start gap-2 text-2xl">
                  <p className="text-center font-semibold">Available to borrow</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="font-bold text-primary"> 80</p>
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
                      <th className="w-1/4 border-r-2 border-white py-2 text-center">Image</th>
                      <th className="w-1/2">NFT Token</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-r-2 border-white py-4">
                        <div className="flex justify-center">
                          <button type="button" className="size-8 rounded-full bg-white"></button>
                        </div>
                      </td>
                      <td className="border-r-2 border-white py-4">
                        <div className="flex justify-center">
                          <img src="/images/token_4.png" alt="NFT" className="size-32" />
                        </div>
                      </td>
                      <td className="py-4 text-center">Aptos monkey #18</td>
                    </tr>
                    <tr>
                      <td className="border-r-2 border-white py-4">
                        <div className="flex justify-center">
                          <button type="button" className="size-8 rounded-full bg-white"></button>
                        </div>
                      </td>
                      <td className="border-r-2 border-white py-4">
                        <div className="flex justify-center">
                          <img src="/images/token_4.png" alt="NFT" className="size-32" />
                        </div>
                      </td>
                      <td className="py-4 text-center">Aptos monkey #18</td>
                    </tr>
                    <tr>
                      <td className="border-r-2 border-white py-4">
                        <div className="flex justify-center">
                          <button type="button" className="size-8 rounded-full bg-white"></button>
                        </div>
                      </td>
                      <td className="border-r-2 border-white py-4">
                        <div className="flex justify-center">
                          <img src="/images/token_4.png" alt="NFT" className="size-32" />
                        </div>
                      </td>
                      <td className="py-4 text-center">Aptos monkey #18</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <button className="rounded-lg bg-secondary px-8 py-2 font-bold text-black ">
                  Deposit
                </button>
              </div>
            </div>
            <div className={selectedTab === '3' ? 'block' : 'hidden'}>
              <h3 className="text-center text-3xl font-semibold">
                Enter <span className="text-primary"> borrow amount</span>
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-start gap-2 text-2xl">
                  <p className="text-center font-semibold"> Borrowed amount</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="font-bold text-primary"> 20</p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-start gap-2 text-2xl">
                  <p className="text-center font-semibold">
                    {'Borrow APT: '}
                    <span className="font-bold text-secondary">8%</span>
                  </p>
                  <p className="text-center font-semibold">
                    {'Health Factor: '}
                    <span className="font-bold text-secondary">1.18</span>
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between rounded-xl bg-[#484549] px-12 py-4">
                <div className="flex flex-col items-start justify-start gap-2 text-xl">
                  <p className="text-left"> Amount</p>
                  <p className="text-left"> 100</p>
                </div>

                <div className="flex flex-col items-end justify-start gap-2 text-xl">
                  <p className="text-center font-semibold"> Balance: 200</p>
                  <div className="flex items-center justify-start gap-2">
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                    <p> APT</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <button className="rounded-lg bg-secondary px-8 py-2 font-bold text-black ">
                  Borrow
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
