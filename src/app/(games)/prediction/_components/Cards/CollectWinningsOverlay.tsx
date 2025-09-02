import TrophyIcon from "@/components/custom_icons/TrophyIcon";
import { NodeLedger, NodeRound } from "@/state/types";
import { formatEther } from "ethers";
import ClaimWinning from "../ClaimWinning";
import Share from "../Share";

interface Props {
  disabled?: boolean;
  round: NodeRound;
  betAmount?: NodeLedger["amount"];
  multiplier: string;
  position: string;
}

const CollectWinningsOverlay = ({
  round,
  multiplier,
  betAmount,
  disabled,
  position,
}: Props) => {
  return (
    <>
      <div className="absolute z-50 bottom-0 left-0 backdrop-blur-[0.6875rem] bg-white/60 rounded-b-[0.625rem] pl-[0.875rem] pr-1 py-[1.375rem] w-full flex items-center justify-between space-x-3">
        <TrophyIcon className="min-w-[2.125rem]" />
        <ClaimWinning
          disabled={disabled}
          round={round}
          betAmount={Number(
            (
              Number(formatEther(betAmount?.toString() ?? "0")) *
              (Number(multiplier) || 1)
            ).toFixed(3)
          )}
        />
        <Share
          className="text-primary"
          round={round}
          multiplier={multiplier}
          position={position}
        />
      </div>
    </>
  );
};

export default CollectWinningsOverlay;
