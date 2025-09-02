import TrophyIcon from "@/components/custom_icons/TrophyIcon";
import PrimaryButton from "@/components/shared/Buttons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PredictionsABI from "@/smart-contract/abi/prediction";
import { NodeRound } from "@/state/types";
import { currencyFormatter, formatBigIntToFixedNumber } from "@/utils";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAccount, useWriteContract } from "wagmi";
import { updateLeaderboard } from "../../../actions/leaderboard";

interface Props {
  disabled?: boolean;
  round: NodeRound;
  betAmount: number;
}

const address = process.env.NEXT_PUBLIC_PREDICTION_ADDRESS as `0x${string}`;

export function ClaimWinning({ round, betAmount, disabled }: Props) {
  const [claimed, setClaimed] = useState(disabled);
  const { address: account } = useAccount();
  const amount = betAmount;

  const rate = round?.closePrice
    ? formatBigIntToFixedNumber(round?.closePrice?.toString() ?? "0")
    : 1;

  const { writeContractAsync, isPending, isSuccess } = useWriteContract();

  const claimHandler = async () => {
    const epoch = round?.epoch;
    const args: any = [[epoch]];

    if (!account) {
      toast.error("Please connect a wallet", {
        className: "toast-error",
      });
      return;
    }

    try {
      const response = await writeContractAsync({
        abi: PredictionsABI,
        address,
        account,
        functionName: "claim",
        args,
      });

      if (typeof response === "string") {
        setClaimed(true);
        await updateLeaderboard({
          address: account,
          totalRoundsWon: 1,
          winnings: amount,
          winningsInUsd: amount * rate,
        });
        toast.success("Claim successfully", {
          className: "toast-success",
        });
      }
    } catch (error: any) {
      // console.error(error, "failed");
      toast.error(error?.shortMessage || error?.message || "Failed to claim", {
        className: "toast-error",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PrimaryButton
          disabled={claimed || isSuccess}
          text={claimed || isSuccess ? "Claimed" : "Claim your winnings"}
          className="px-0 ring-[#334058] text-sm leading-6 py-[0.375rem]"
        />
      </DialogTrigger>
      <DialogContent className="max-w-[21rem] bg-white border border-onyx rounded-[0.625rem] drop-shadow-container backdrop-blur-sm py-8 px-6 text-white">
        <DialogHeader>
          <DialogTitle className="sr-only">Claim Winning</DialogTitle>
        </DialogHeader>
        <div className="">
          <h2 className="font-medium text-base lg:text-lg text-center mb-2 lg:leading-8">
            Claim your Winnings
          </h2>
          <TrophyIcon className="size-[3.5rem] mx-auto mb-6" />
          <div className="border mb-6 border-tuna rounded-sm px-4 py-[0.4375rem] space-y-1">
            <span className="flex items-center justify-between">
              <span className="text-xs text-gray-100">Amount to claim</span>
              <span className="text-gray-25 text-sm text-right">
                {amount} HBAR{" "}
                <span className="text-gray-100 text-xs">
                  ({currencyFormatter(amount * rate)})
                </span>
              </span>
            </span>
            <span className="flex items-center justify-between">
              <span className="text-xs text-gray-100">Round</span>
              <span className="text-gray-25 text-sm text-right">
                #{round?.epoch}
              </span>
            </span>
          </div>
          <PrimaryButton
            disabled={isPending || isSuccess}
            text={
              isPending ? "Claiming..." : isSuccess ? "Claimed" : "Claim now"
            }
            onClick={claimHandler}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ClaimWinning;
