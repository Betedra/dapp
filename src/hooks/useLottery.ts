import LotteryABI from "@/smart-contract/abi/lottery";
import { processViewLotterySuccessResponse } from "@/state/lottery/helpers";
import { useReadContract } from "wagmi";
import useGetCurrentLotteryId from "./useGetCurrentLotteryId";

const address = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS as `0x${string}`;

const useLottery = () => {
  const { currentLotteryId, refetchCurrentLotteryId } =
    useGetCurrentLotteryId();
  const { data, refetch } = useReadContract({
    address,
    abi: LotteryABI,
    functionName: "viewLottery",
    args: [currentLotteryId.toString()],
    query: {
      enabled: !!currentLotteryId,
    },
  });

  if (!data)
    return {
      currentRound: null,
      currentLotteryId,
      refetch,
      refetchCurrentLotteryId,
    };

  return {
    currentLotteryId,
    currentRound: processViewLotterySuccessResponse(
      data,
      currentLotteryId.toString()
    ),
    refetchCurrentLotteryId,
    refetch,
  };
};

export default useLottery;
