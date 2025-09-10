"use client";
import PrimaryButton from "@/components/shared/Buttons";
import { currencyFormatter } from "@/utils";
import Image from "next/image";
import React from "react";
import BuyTickets from "./BuyTickets";
import ViewUserTickets from "./ViewUserTickets";

interface MatchCardProps {
  label: string;
  amount: number;
}

const MatchCard = ({ label, amount }: MatchCardProps) => {
  return (
    <div className="w-fit">
      <h5 className="text-base font-medium text-transparent mb-1 bg-clip-text bg-gradient-to-b from-blue-500 via-dodger-blue to-purple-500">
        {label}
      </h5>
      <span>
        <h5 className="text-blue-gray-900 font-bold text-lg leading-4">
          {amount} HBAR
        </h5>
        <span className="text-xs text-blue-gray-600">~$664</span>
      </span>
    </div>
  );
};

const OngoingLottery = () => {
  return (
    <section className="mb-[2.625rem] px-4 xl:px-0">
      <div className="mx-auto max-w-[83.5625rem] overflow-hidden mb-[3.4375rem] isolate rounded-2xl flex justify-center items-center relative lottery-gradient min-h-[23rem]">
        <Image
          src="/svgs/radial-sun-burst.svg"
          alt="Radial Sun burst"
          fill
          className="object-top object-cover absolute -z-10 top-0 left-0 w-full h-full"
        />
        <div className="text-center text-blue-gray-25 relative">
          <Image
            src="/images/glowing-star.gif"
            alt="Glowing star"
            className="absolute bottom-0 -left-36 md:-left-52 -rotate-y-180"
            width={150}
            height={150}
          />
          <Image
            src="/images/glowing-star.gif"
            alt="Glowing star"
            className="absolute bottom-0 -right-36 md:-right-52"
            width={150}
            height={150}
          />
          <span className="block text-base font-semibold mb-[0.3125rem]">
            The Betedra Lottery of
          </span>
          <h2 className="font-bold text-2xl md:text-3xl lg:text-5xl mb-[0.3125rem]">
            {currencyFormatter(5000)}
          </h2>
          <span className="block text-base font-semibold mb-8">in prizes</span>
          <BuyTickets
            trigger={
              <PrimaryButton
                text="Buy tickets"
                className="max-w-[10.4375rem] mx-auto"
              />
            }
          />
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-5 mx-auto max-w-[75.125rem]">
        <div className="w-full lg:max-w-[15.25rem] px-6 py-10 border text-center flex items-center justify-between space-y-[3.375rem] flex-col border-blue-gray-200 rounded-2xl">
          <div className="text-blue-gray-900">
            <h4 className="text-base font-semibold">Next draw starts in</h4>
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">
              5<span className="lg:text-lg">h</span> 20
              <span className="lg:text-lg">m</span>
            </h2>
            <span className="text-blue-gray-600 text-sm block mb-1 font-medium">
              {new Date().toLocaleString()}
            </span>
            <span className="text-blue-gray-500 text-xs block font-medium">
              Round #1256
            </span>
          </div>
          <div className="text-blue-gray-900">
            <h4 className="text-base font-semibold mb-1">Prize Pot</h4>
            <h2 className="font-bold text-2xl lg:text-[2rem]">
              {currencyFormatter(5000)}
            </h2>
            <span className="text-blue-gray-600 text-base font-medium">
              ~22,678 HBAR
            </span>
          </div>
        </div>
        <div className="w-full border border-blue-gray-200 rounded-2xl overflow-hidden">
          <div className="bg-blue-gray-100 p-4 md:px-8 md:py-2.5 flex space-y-3 md:space-y-0 md:items-center flex-col md:flex-row justify-between">
            <span className="font-medium text-base text-blue-gray-600">
              Your tickets
            </span>
            <span className="font-medium text-base text-blue-gray-600">
              You have{" "}
              <span className="text-blue-gray-900 font-bold inline-block">
                0
              </span>{" "}
              tickets in this round
            </span>
            <span className="flex items-center space-x-[1.125rem] text-blue-600">
              <ViewUserTickets />
              <BuyTickets
                trigger={
                  <PrimaryButton
                    text="Buy tickets"
                    className="max-w-[7.1875rem] whitespace-nowrap"
                  />
                }
              />
            </span>
          </div>
          <div className="px-8 py-4">
            <p className="text-base text-blue-gray-600 mb-[1.4375rem]">
              Match the winning number in the same order to share prizes.
              Current prizes up for grabs:
            </p>
            <div className="flex flex-wrap lg:flex-nowrap justify-between gap-[1.75rem]">
              <div className="w-full grid grid-cols-2 gap-y-[1.4375rem] md:grid-cols-3 place-content-between">
                <MatchCard label="Match first 1" amount={500} />
                <MatchCard label="Match first 2" amount={500} />
                <MatchCard label="Match first 3" amount={500} />
                <MatchCard label="Match first 4" amount={500} />
                <MatchCard label="Match first 5" amount={500} />
                <MatchCard label="Match all 6" amount={500} />
              </div>
              <div className="w-full text-center lg:max-w-[10.4375rem] py-8 bg-error-100 rounded-2xl gap-2 flex flex-col justify-center items-center">
                <h4 className="font-medium text-error-600 text-base">Burn</h4>
                <span>
                  <h5 className="text-blue-gray-900 font-bold text-lg leading-4">
                    500 HBAR
                  </h5>
                  <span className="text-xs text-blue-gray-600">~$664</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OngoingLottery;
