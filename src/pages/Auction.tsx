import { CoinIcon } from '@/components/icons/coin';

const AuctionPage = () => {
  return (
    <div className="w-full bg-[url('/bg.png')] bg-cover bg-center p-32 text-lg">
      <h1 className="text-left font-prototype text-[38px] tracking-wide text-white">
        Available to Auction
      </h1>
      <div className="mt-20  grid grid-cols-4 gap-12">
        <div className="col-span-1 flex justify-center">
          <div className="max-w-64 rounded-xl  border border-solid border-[#D9D9D9] bg-card">
            <div>
              <img src="/images/token_tmp.png" alt="token" className="size-full rounded-t-xl" />
            </div>
            <div className="px-4 pb-2">
              <h3 className="my-2 text-center text-lg font-bold text-white">Aptos Monkey #12</h3>
              <div className="flex items-center justify-between text-base text-white/80">
                <div className="text-left">
                  <p>Current Debt</p>
                  <div className="flex items-center gap-1">
                    <span className="text-start font-bold">2.3</span>
                    <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
                  </div>
                </div>
                <div className="text-right">
                  <p>First Bid Bonus</p>
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-start font-bold">4</span>
                    <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
                  </div>
                </div>
              </div>
              <button className="mt-2 w-full rounded-lg bg-secondary py-1 text-base font-semibold text-black">
                Place Bid
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex justify-center">
          <div className="max-w-64 rounded-xl  border border-solid border-[#D9D9D9] bg-card">
            <div>
              <img src="/images/token_tmp.png" alt="token" className="size-full rounded-t-xl" />
            </div>
            <div className="px-4 pb-2">
              <h3 className="my-2 text-center text-lg font-bold text-white">Aptos Monkey #12</h3>
              <div className="flex items-center justify-between text-base text-white/80">
                <div className="text-left">
                  <p>Current Debt</p>
                  <div className="flex items-center gap-1">
                    <span className="text-start font-bold">2.3</span>
                    <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
                  </div>
                </div>
                <div className="text-right">
                  <p>First Bid Bonus</p>
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-start font-bold">4</span>
                    <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
                  </div>
                </div>
              </div>
              <button className="mt-2 w-full rounded-lg bg-secondary py-1 text-base font-semibold text-black">
                Place Bid
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex justify-center">
          <div className="max-w-64 rounded-xl  border border-solid border-[#D9D9D9] bg-card">
            <div>
              <img src="/images/token_tmp.png" alt="token" className="size-full rounded-t-xl" />
            </div>
            <div className="px-4 pb-2">
              <h3 className="my-2 text-center text-lg font-bold text-white">Aptos Monkey #12</h3>
              <div className="flex items-center justify-between text-base text-white/80">
                <div className="text-left">
                  <p>Current Debt</p>
                  <div className="flex items-center gap-1">
                    <span className="text-start font-bold">2.3</span>
                    <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
                  </div>
                </div>
                <div className="text-right">
                  <p>First Bid Bonus</p>
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-start font-bold">4</span>
                    <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
                  </div>
                </div>
              </div>
              <button className="mt-2 w-full rounded-lg bg-secondary py-1 text-base font-semibold text-black">
                Place Bid
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex justify-center">
          <div className="max-w-64 rounded-xl  border border-solid border-[#D9D9D9] bg-card">
            <div>
              <img src="/images/token_tmp.png" alt="token" className="size-full rounded-t-xl" />
            </div>
            <div className="px-4 pb-2">
              <h3 className="my-2 text-center text-lg font-bold text-white">Aptos Monkey #12</h3>
              <div className="flex items-center justify-between text-base text-white/80">
                <div className="text-left">
                  <p>Current Debt</p>
                  <div className="flex items-center gap-1">
                    <span className="text-start font-bold">2.3</span>
                    <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
                  </div>
                </div>
                <div className="text-right">
                  <p>First Bid Bonus</p>
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-start font-bold">4</span>
                    <img src="/APT.png" alt="APT" className="size-4 rounded-full" />
                  </div>
                </div>
              </div>
              <button className="mt-2 w-full rounded-lg bg-secondary py-1 text-base font-semibold text-black">
                Place Bid
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 w-2/3 rounded-2xl border-b-8 border-primary bg-card p-8 text-lg text-white">
        <div>
          <h3 className="text-center text-3xl font-semibold">
            Place <span className="text-secondary"> Bid</span>
          </h3>
          <p className="mt-1 text-center">
            The first bidder will receive the first bid bonus if the borrower redeems his debt
            within <span className="font-bold">24 hours</span>
          </p>
          <button className="mt-4 rounded-full border-2 border-secondary px-2 text-white">
            First bid available
          </button>
          <div className="mt-2 grid grid-cols-3 gap-16">
            <div className="col-span-1">
              <img src="/images/token_tmp.png" alt="token" className="size-full rounded-xl" />
            </div>
            <div className="col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-start gap-2 ">
                  <p className="text-center font-semibold"> Highest Bid</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="text-2xl font-bold text-primary"> 100</p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-start gap-2 ">
                  <p className="text-center font-semibold"> First Bid Bonus</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="text-2xl font-bold text-secondary"> 100</p>
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
                    <p className="text-2xl font-bold text-primary"> 100</p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-start gap-2 ">
                  <p className="text-center font-semibold"> Minimum Bid</p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="text-2xl font-bold text-secondary"> 100</p>
                    <div className="size-8">
                      <CoinIcon />
                    </div>
                  </div>
                </div>
              </div>
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
              Place your Bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
