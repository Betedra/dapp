"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

const fetcher = (address: string) =>
  fetch(`https://app.sailfish.finance/api/participant?address=${address}`).then(
    (response) => {
      if (response.ok) {
        return response.json();
      }
      return null;
    }
  );

const useParticipant = () => {
  const configuredChainId = process.env.NEXT_PUBLIC_CHAIN_ID;
  const { isConnected, address, chainId } = useAccount();

  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: [`participant`, address],
    queryFn: () => fetcher(address!),
    enabled: isConnected && chainId === Number(configuredChainId) && !!address,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
  });

  return {
    participant: data,
    isLoading,
    isFetching,
    isError,
    error,
  };
};

export default useParticipant;
