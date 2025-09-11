"use client";
import CupIcon from "@/components/custom_icons/CupIcon";
import TicketIcon from "@/components/custom_icons/TicketIcon";
import UserIcon from "@/components/custom_icons/UserIcon";
import PrimaryButton from "@/components/shared/Buttons";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useHBarPrice from "@/hooks/useHBarPrice";
import useLotteryHistory from "@/hooks/useLotteryHistory";
import { LotteryResponse } from "@/state/lottery/types";
import { cn, currencyFormatter, formatDate } from "@/utils";
import { BIG_ZERO } from "@/utils/bigNumber";
import BigNumber from "bignumber.js";
import React, { MouseEvent, useMemo, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuArrowRightToLine } from "react-icons/lu";
import BuyTickets from "./BuyTickets";
import Numbers from "./Numbers";
import ViewUserTickets from "./ViewUserTickets";

const rewardBrackets = [0, 1, 2, 3, 4, 5];

const RoundDetails = ({ round }: { round: LotteryResponse | null }) => {
  const wHbarPrice = useHBarPrice();
  const prizeTotal = Number(round?.amountCollectedInWHbar) * wHbarPrice;

  const getHBarRewards = (bracket: number) => {
    if (!round?.rewardsBreakdown) return BIG_ZERO;

    const shareAsPercentage = new BigNumber(
      round?.rewardsBreakdown[bracket]
    ).div(100);
    const result = new BigNumber(round?.treasuryFee)
      .div(100)
      .times(shareAsPercentage);
    return result.toString();
  };

  const totalPlayers = useMemo(() => {
    if (round) {
      return round.countWinnersPerBracket.reduce((total, count) => {
        return total + Number(count);
      }, 0);
    }
    return 0;
  }, [round]);

  if (!round) return null;

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-[1.4375rem] px-4 md:px-8 py-4">
      <div className="w-full lg:max-w-[15.25rem] py-4 md:px-4 flex md:items-start gap-[3.375rem] md:pb-[1.6875rem] md:flex-col">
        <div className="flex items-start space-x-1">
          <span className="flex items-center justify-center rounded-full bg-blue-gray-100 size-11">
            <CupIcon />
          </span>
          <div className="text-blue-gray-900">
            <h4 className="text-sm font-semibold mb-1">Prize Pot</h4>
            <h2 className="font-bold leading-5 text-xl lg:text-2xl">
              {currencyFormatter(prizeTotal)}
            </h2>
            <span className="text-blue-gray-600 text-xs font-medium">
              ~{Number(round?.amountCollectedInWHbar).toLocaleString()} HBAR
            </span>
          </div>
        </div>
        <div className="flex items-start space-x-1">
          <span className="flex items-center justify-center rounded-full bg-blue-gray-100 size-11">
            <UserIcon />
          </span>
          <div className="text-blue-gray-900">
            <h4 className="text-sm font-semibold mb-1">Total Players</h4>
            <h2 className="font-bold leading-5 text-xl lg:text-2xl">
              {totalPlayers}
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full">
        <p className="text-base text-blue-gray-600 mb-[1.4375rem]">
          Match the winning number in the same order to share prizes. Current
          prizes up for grabs:
        </p>
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-[1.75rem]">
          <div className="w-full grid grid-cols-2 gap-y-[1.4375rem] md:grid-cols-3 place-content-between">
            {rewardBrackets.map((bracketIndex) => (
              <MatchCard
                key={bracketIndex}
                rewardBracket={bracketIndex + 1}
                amount={Number(getHBarRewards(bracketIndex)) || 0}
                numberWinners={round.countWinnersPerBracket[bracketIndex]}
              />
            ))}
          </div>
          {/* <div className="w-full text-center lg:max-w-[10.4375rem] py-8 bg-error-100 rounded-2xl gap-2 flex flex-col justify-center items-center">
            <h4 className="font-medium text-error-600 text-base">Burn</h4>
            <span>
              <h5 className="text-blue-gray-900 font-bold text-lg leading-4">
                500 HBAR
              </h5>
              <span className="text-xs text-blue-gray-600">~$664</span>
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const Round = () => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleVisibility = (event: MouseEvent<HTMLButtonElement>) => {
    const rounds_elements = document.querySelectorAll(".round");
    rounds_elements.forEach((element) => {
      element.setAttribute("data-state", "closed");
    });
    const rootParentElement =
      event.currentTarget.parentElement?.parentElement?.parentElement;
    if (rootParentElement) {
      rootParentElement.setAttribute(
        "data-state",
        showDetails ? "closed" : "open"
      );
    }
    setShowDetails(!showDetails);
  };
  return (
    <div className="round group">
      <div className="flex items-center justify-between *:inline-block text-blue-gray-600 text-base font-medium">
        <span className="text-blue-gray-500">#1256</span>
        <span className="text-center">Aug 30, 2025. 1:00 PM</span>
        <div className="flex items-center space-x-[2.625rem]">
          <span className="text-right">1</span>
          <button className="text-blue-500" onClick={toggleVisibility}>
            <span className="group-data-[state=open]:hidden">Show</span>
            <span className="hidden group-data-[state=open]:inline-block">
              Hide
            </span>
          </button>
        </div>
      </div>
      <div
        className={cn(
          "h-0 overflow-hidden transition-all duration-75 opacity-0 group-data-[state=open]:opacity-100 group-data-[state=open]:mt-6 group-data-[state=open]:h-auto"
        )}
      >
        <div className="bg-blue-500 px-8 py-7 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between rounded-2xl">
          <span className="text-base font-medium text-blue-gray-600">
            Winning numbers
          </span>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center text-white">
            <Numbers className="gap-2 *:size-[3.5rem] *:text-[1.39875rem]" />
            <ViewUserTickets />
          </div>
        </div>
        {/* <RoundDetails /> */}
      </div>
    </div>
  );
};

interface MatchCardProps {
  amount: number;
  rewardBracket: number;
  numberWinners: string;
}

const MatchCard = ({
  rewardBracket,
  amount,
  numberWinners,
}: MatchCardProps) => {
  const wHbarPrice = useHBarPrice();
  const amountInUsd = useMemo(() => {
    if (amount && wHbarPrice) {
      return wHbarPrice * amount;
    }
    return 0;
  }, [wHbarPrice, amount]);
  return (
    <div>
      <h5 className="text-base font-medium text-transparent mb-1 bg-clip-text bg-gradient-to-b from-blue-500 via-dodger-blue to-purple-500">
        Match {rewardBracket < 6 ? "first" : "all"} {rewardBracket}
      </h5>
      <span>
        <h5 className="text-blue-gray-900 font-bold text-lg leading-4">
          {amount} HBAR
        </h5>
        <span className="text-xs text-blue-gray-600 block mb-1">
          ~{currencyFormatter(amountInUsd)}
        </span>
        <span className="flex items-center text-blue-gray-600 text-[0.625rem] space-x-0.5">
          <TicketIcon />
          <span>
            {numberWinners} winning{" "}
            {Number(numberWinners) > 1 ? "tickets" : "ticket"}
          </span>
        </span>
      </span>
    </div>
  );
};

const AllHistory = () => {
  const {
    isLoading,
    round,
    isPrevDisabled,
    isNextDisabled,
    next,
    previous,
    goToLatest,
    latestId,
    currentLotteryId,
  } = useLotteryHistory();

  const drawnOn = useMemo(() => {
    if (round) {
      const endTimeMs = parseInt(round.endTime, 10) * 1000;
      const endDate = new Date(endTimeMs);
      return formatDate(endDate);
    }
    return "";
  }, [round]);

  if (!round && isLoading)
    return <Skeleton className="rounded-2xl min-h-[24.6875rem]" />;

  if (!round && !isLoading)
    return (
      <div className="border border-blue-gray-200 text-base text-center text-blue-gray-600 rounded-2xl min-h-[24.6875rem] flex items-center justify-center flex-col">
        <p className="mb-1.5">No lottery history found</p>
        {currentLotteryId !== latestId ? (
          <>
            <p className="mb-6">Get tickets for the next round</p>
            <BuyTickets
              trigger={
                <PrimaryButton
                  text="Buy tickets"
                  className="max-w-[12.125rem]"
                />
              }
            />
          </>
        ) : null}
      </div>
    );

  return (
    <div className="border border-blue-gray-200 rounded-2xl">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between pb-5 pt-2.5 px-8">
        <span className="flex items-center space-x-1 text-base text-blue-gray-500">
          <span>Round</span>
          <span className="border block p-2 rounded-xl border-blue-gray-300">
            #{latestId}
          </span>
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={previous}
            disabled={isPrevDisabled}
            className="disabled:opacity-50 disabled:cursor-not-allowed border-blue-gray-300 border rounded-[0.75rem] p-2 text-blue-gray-900"
          >
            <LuArrowLeft size={24} />
          </button>
          <button
            disabled={isNextDisabled}
            onClick={next}
            className="disabled:opacity-50 disabled:cursor-not-allowed border-blue-gray-300 border rounded-[0.75rem] p-2 text-blue-gray-900"
          >
            <LuArrowRight size={24} />
          </button>
          <button
            disabled={isNextDisabled}
            onClick={goToLatest}
            className="disabled:opacity-50 disabled:cursor-not-allowed border-blue-gray-300 border rounded-[0.75rem] p-2 text-blue-gray-900"
          >
            <LuArrowRightToLine size={24} />
          </button>
        </div>
        <span className="text-base font-medium text-blue-gray-600">
          Drawn on - {drawnOn}
        </span>
      </div>
      <div className="bg-blue-500 px-8 py-7 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between">
        <span className="text-base font-medium text-blue-gray-600">
          Winning numbers
        </span>
        <Numbers
          className="gap-2 *:size-[3.5rem] *:text-[1.39875rem]"
          value={round?.finalNumber}
        />
      </div>
      <RoundDetails round={round} />
    </div>
  );
};

const UserHistory = () => {
  const isEmpty = false;

  if (isEmpty) {
    return (
      <div className="border border-blue-gray-200 text-base text-center text-blue-gray-600 rounded-2xl min-h-[24.6875rem] flex items-center justify-center flex-col">
        <p className="mb-1.5">No lottery history found</p>
        <p className="mb-6">Get tickets for the next round</p>
        <BuyTickets
          trigger={
            <PrimaryButton text="Buy tickets" className="max-w-[12.125rem]" />
          }
        />
      </div>
    );
  }
  return (
    <div className="border border-blue-gray-200 rounded-2xl min-h-[24.6875rem] px-6 py-4">
      <div className="flex items-center mb-6 justify-between *:inline-block text-blue-gray-600 text-base font-medium">
        <span className="">Round</span>
        <span className="text-center">Date Drawn</span>
        <span className="text-right">Tickets</span>
      </div>
      {/* ROUNDS */}
      <div className="space-y-6">
        <Round />
        <Round />
      </div>
    </div>
  );
};

const PastRounds = () => {
  return (
    <section className="py-[4.6875rem] px-4 xl:px-0">
      <h2 className="text-center text-blue-gray-900 text-2xl md:text-3xl lg:text-5xl font-bold mb-[1.6875rem]">
        Past Rounds
      </h2>
      <Tabs defaultValue="all" className="w-full mx-auto max-w-[77.0625rem]">
        <TabsList className="w-full justify-start bg-transparent p-0 mb-[1.6875rem]">
          <TabsTrigger
            value="all"
            className="px-[2.40625rem] pb-4 text-base data-[state=active]:font-semibold text-blue-gray-400 data-[state=active]:text-blue-gray-900 border-b-3 border-transparent data-[state=active]:border-blue-500"
          >
            All History
          </TabsTrigger>
          <TabsTrigger
            value="user"
            className="px-[2.40625rem] pb-4 text-base data-[state=active]:font-semibold text-blue-gray-400 data-[state=active]:text-blue-gray-900 border-b-3 border-transparent data-[state=active]:border-blue-500"
          >
            Your History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AllHistory />
        </TabsContent>
        <TabsContent value="user">
          <UserHistory />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default PastRounds;
