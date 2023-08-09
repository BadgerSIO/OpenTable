import { PRICE } from "@prisma/client";
import React from "react";

const Price = ({ price }: { price: PRICE }) => {
  const renderPrice = () => {
    if (price === "CHEAP") {
      return (
        <>
          <span className="text-red-500">$$</span>
          <span className="text-gray-300">$$</span>
        </>
      );
    } else if (price === "REGULAR") {
      return (
        <>
          <span className="text-red-500">$$$</span>
          <span className="text-gray-300">$</span>
        </>
      );
    } else {
      return (
        <>
          <span className="text-red-500">$$$$</span>
        </>
      );
    }
  };
  return <p className="mr-3">{renderPrice()}</p>;
};

export default Price;
