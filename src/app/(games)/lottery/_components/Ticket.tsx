import React from "react";
import Numbers from "./Numbers";

interface TicketProps {
  index: number;
  cost?: number;
  showTotal?: boolean;
}

const Ticket = ({ cost, index, showTotal }: TicketProps) => {
  return (
    <div>
      <span className="flex items-center mb-1.5 justify-between text-sm text-blue-gray-900">
        <span>Ticket {index}</span>
        {showTotal ? (
          <span className="text-blue-gray-500 text-xs">
            Total cost: <span className="text-blue-gray-900">{cost} HBAR</span>
          </span>
        ) : null}
      </span>
      <Numbers />
    </div>
  );
};

export default Ticket;
