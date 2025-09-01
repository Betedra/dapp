import { type ClassValue, clsx } from "clsx";
import { formatUnits } from "ethers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = (
  value: number | string,
  fractionDigits = 0,
  currency = ""
) => {
  value = Number(value);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
  }).format(value);
  return formatted.replace(currency, "");
};

export const formatPriceDifference = (
  value: string,
  digitDecimal: number = 2,
  format = true
) => {
  const price = Number(formatUnits(value, 6));

  if (!format) return price;

  return currencyFormatter(price, digitDecimal);
};

export const formatBigIntToFixed = (value: string, digitDecimal: number) => {
  const price = Number(formatUnits(value, 6));

  return currencyFormatter(price, digitDecimal);
};

export const formatBigIntToFixedNumber = (value: string) => {
  const price = Number(formatUnits(value, 6));

  return price;
};

export function formatNumber(
  number: number,
  minimumFractionDigits: number = 2
) {
  if (number >= 1_000_000_000_000) {
    return (
      (number / 1_000_000_000_000)
        .toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
          minimumFractionDigits,
        })
        .replace(/\.0$/, "") + "T"
    );
  } else if (number >= 1_000_000_000) {
    return (
      (number / 1_000_000_000)
        .toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
          minimumFractionDigits,
        })
        .replace(/\.0$/, "") + "B"
    );
  } else if (number >= 1_000_000) {
    return (
      (number / 1_000_000)
        .toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
          minimumFractionDigits,
        })
        .replace(/\.0$/, "") + "M"
    );
  } else if (number >= 1_000) {
    return (
      (number / 1_000)
        .toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
          minimumFractionDigits,
        })
        .replace(/\.0$/, "") + "k"
    );
  } else {
    return number.toLocaleString("en-US", {
      currency: "USD",
      style: "currency",
      minimumFractionDigits,
    });
  }
}
