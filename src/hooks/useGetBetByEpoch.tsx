import PredictionsABI from "@/smart-contract/abi/prediction";
import { useReadContract } from "wagmi";

const address = process.env.NEXT_PUBLIC_PREDICTION_ADDRESS as `0x${string}`;

const useGetBetByEpoch = (account: `0x${string}`, epoch: number) => {
  const { data: response } = useReadContract({
    address,
    abi: PredictionsABI,
    functionName: "ledger",
    args: [BigInt(epoch), account] as const,
    query: {
      enabled: epoch !== null,
    },
  });

  if (!response) return null;

  return {
    position: response[0] as 0 | 1,
    amount: response[1],
    claimed: response[2],
  };
};

export default useGetBetByEpoch;
