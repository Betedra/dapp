import QuestionMarkIcon from "@/components/custom_icons/QuestionMarkIcon";
import PrimaryButton from "@/components/shared/Buttons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import Numbers from "./Numbers";
import Ticket from "./Ticket";

const ViewUserTickets = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="underline whitespace-nowrap text-blue-600 font-medium text-sm lg:text-base">
          View your tickets
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[20.4375rem] w-full bg-white rounded-2xl py-8 px-4 text-mine-shaft">
        <DialogHeader>
          <DialogTitle className="sr-only">My Tickets</DialogTitle>
        </DialogHeader>
        <div className="space-y-[1.125rem]">
          <h3 className="text-base font-semibold text-center mb-1">
            Your tickets
          </h3>
          <span className="text-sm block text-blue-gray-800">Round #2002</span>
          <div className="p-2 rounded-lg space-y-1.5 lottery-gradient">
            <h6 className="text-blue-gray-25 text-xs">Winning numbers</h6>
            <Numbers />
          </div>
          <Ticket index={1} />
          <PrimaryButton text="Buy more tickets" />
          <div className="bg-blue-gray-100 rounded-lg p-2 space-y-1.5">
            <span className="flex items-center justify-between text-sm">
              <span className="text-blue-gray-500">Total ticket</span>
              <span className="text-blue-gray-900 font-medium">1</span>
            </span>
            <span className="flex items-center justify-between text-sm">
              <span className="text-blue-gray-500">Winning ticket</span>
              <span className="text-blue-gray-900 font-medium">0</span>
            </span>
          </div>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <span className="flex items-center justify-center space-x-1.5 text-blue-gray-900 text-xs">
                <QuestionMarkIcon />
                <span>Why didn’t I win?</span>
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-white p-2 rounded-[0.661875rem] max-w-[18rem]">
              <p className="whitespace-pre-wrap text-xs text-blue-gray-900">
                Ticket must match the winning number in the exact same order,
                starting from the first digit.
                <br />
                <br />
                If the winning number is “87654321“
                <br />
                <br />
                “873333”matches the first 2 digits
                <br />
                <br />
                “00001” matches the last digit, but since the first five digits
                are wrong, it doesn’t win any prize.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserTickets;
