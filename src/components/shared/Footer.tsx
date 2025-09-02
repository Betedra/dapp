import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-gray-900 py-6 px-8 lg:px-[4.9375rem] flex flex-wrap items-center justify-between">
      <Image
        src="/svgs/logo-white.svg"
        alt="Betedra Logo"
        width={113}
        height={46.11}
      />
      <span className="flex items-center space-x-4 text-blue-gray-25 text-xs">
        <span>Powered by</span>
        <Image
          src="/svgs/hedera.svg"
          alt="Hedera"
          width={79.87}
          height={23.56}
        />
      </span>
    </footer>
  );
};

export default Footer;
