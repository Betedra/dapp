"use client";
import PrimaryButton from "@/components/shared/Buttons";
import Image from "next/image";
import React from "react";

const CheckStatus = () => {
  return (
    <section className="bg-purple-500 flex isolate items-center relative justify-center py-[4.375rem]">
      <Image
        src="/svgs/radial-sun-burst-2.svg"
        alt="Radial Sun burst"
        fill
        className="object-bottom object-cover absolute -z-10 top-0 left-0 w-full h-full"
      />
      <div className="text-center text-blue-gray-25">
        <h3 className="text-base font-semibold mb-[0.3125rem]">
          Gotten tickets?
        </h3>
        <h4 className="font-bold text-2xl mb-8">Check if you’re a winner</h4>
        <PrimaryButton text="Check now" className="max-w-[12.125rem]" />
      </div>
    </section>
  );
};

export default CheckStatus;
