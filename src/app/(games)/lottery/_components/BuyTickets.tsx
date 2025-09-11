"use client";
import TicketIcon from "@/components/custom_icons/TicketIcon";
import PrimaryButton from "@/components/shared/Buttons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetBalance from "@/hooks/useGetBalanceAndDecimal";
import useLottery from "@/hooks/useLottery";
import { LotteryStatus } from "@/state/lottery/types";
import useLotteryTransitionStore from "@/store/useLotteryTransitionStore";
import { ZeroAddress } from "ethers";
import React, { ReactNode, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Ticket from "./Ticket";

const RandomizeTickets = ({ goBack }: { goBack: () => void }) => {
  return (
    <div className="space-y-[1.125rem]">
      <span className="flex items-center space-x-2.5">
        <MdKeyboardArrowLeft size={20} role="button" onClick={goBack} />
        <h3 className="font-semibold text-base text-center w-full">
          Randomize your numbers
        </h3>
      </span>
      <Ticket index={1} cost={5} showTotal />
      <Ticket index={2} />
      <PrimaryButton
        text="Randomize your numbers"
        className="bg-white white py-2"
      />
      <span className="block rounded-lg p-2 bg-yellow-50 text-xs text-blue-gray-900">
        Your numbers are chosen randomly, ensuring there are no duplicates. Just
        tap on a number if you&apos;d like to make any changes or click on the
        button.
      </span>
      <PrimaryButton text="Confirm and buy" className="py-2" />
    </div>
  );
};

interface Props {
  trigger: ReactNode;
}

const BuyTickets = ({ trigger }: Props) => {
  const [isRandomizing, setRandomize] = useState(false);
  const [tickets, setTickets] = useState(1);
  const { balance } = useGetBalance(ZeroAddress, 18);

  const { currentRound } = useLottery();
  const { isTransitioning } = useLotteryTransitionStore();
  const ticketBuyIsDisabled =
    currentRound?.status !== LotteryStatus.OPEN || isTransitioning;

  console.log({ currentRound });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[20.4375rem] w-full bg-white rounded-2xl py-8 px-4 text-mine-shaft">
        <DialogHeader>
          <DialogTitle className="sr-only">Buy Tickets</DialogTitle>
        </DialogHeader>
        {isRandomizing ? (
          <RandomizeTickets goBack={() => setRandomize(false)} />
        ) : (
          <div>
            <h3 className="text-base font-semibold text-center mb-1">
              Buy tickets
            </h3>
            <div className="space-y-[1.125rem]">
              <div className="space-y-1.5">
                <h5 className="text-sm text-blue-gray-500">Buy</h5>
                <div className="border border-gray-200 rounded-lg p-2 flex items-center justify-between">
                  <TicketIcon />
                  <div>
                    <input
                      type="number"
                      value={tickets}
                      onChange={(event) => {
                        const value = event.target.value;
                        setTickets(Number(value));
                      }}
                      className="p-0 border-0 text-right outline-none"
                      min={1}
                    />
                    <span className="text-xs text-blue-gray-500">~ 0 HBAR</span>
                  </div>
                </div>
                <span className="text-blue-gray-500 text-xs">
                  Available HBAR:{" "}
                  <span className="text-blue-gray-900">{balance}</span>
                </span>
              </div>
              <div className="bg-blue-gray-25 rounded-lg p-2 gap-1">
                <span className="flex items-center justify-between">
                  <span className="text-xs text-blue-gray-500">Cost:</span>
                  <span className="text-xs text-blue-gray-900 text-right">
                    200 HBAR
                  </span>
                </span>
                <span className="flex items-center justify-between">
                  <span className="text-xs text-blue-gray-500">
                    Transaction fees:
                  </span>
                  <span className="text-xs text-blue-gray-900 text-right">
                    5 HBAR
                  </span>
                </span>
                <span className="flex items-center justify-between">
                  <span className="text-xs text-blue-gray-500">
                    Amount to pay:
                  </span>
                  <span className="text-sm font-medium text-blue-gray-900 text-right">
                    205 HBAR
                  </span>
                </span>
              </div>
              <span className="space-y-2 block">
                <PrimaryButton
                  disabled={ticketBuyIsDisabled}
                  disabledText="Sale ended!"
                  text="Buy now"
                  className="py-2"
                />
                {!ticketBuyIsDisabled ? (
                  <PrimaryButton
                    text="Randomize your numbers"
                    className="bg-white white py-2"
                    onClick={() => setRandomize(true)}
                  />
                ) : null}
              </span>
              <span className="block rounded-lg p-2 bg-yellow-50 text-xs text-blue-gray-900">
                &quot;Buy now&quot; selects unique random numbers for your
                tickets. Prices are fixed at $5 before each round, and purchases
                are final.
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BuyTickets;
