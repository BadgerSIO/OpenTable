"use client";

import { useContext } from "react";
import { BookingContext } from "../../../context/bookingContext";

const AllMostDone = () => {
  const { didBook } = useContext(BookingContext);
  return <>{!didBook && <h3 className="font-bold">You're almost done!</h3>}</>;
};

export default AllMostDone;
