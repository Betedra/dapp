import { educhain } from "@/providers/wagmi/config";
import { createPublicClient, http } from "viem";

export const publicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: educhain,
  transport: http(educhain.rpcUrls.default.http[0]),
});
