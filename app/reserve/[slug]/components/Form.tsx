"use client";

import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useReservation from "../../../../hooks/useReservation";
import { BookingContext } from "../../../context/bookingContext";

const Form = ({
  slug,
  date: reservationDate,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) => {
  const { error, loading, createReservation } = useReservation();
  const [date, time] = reservationDate.split("T");
  const { didBook, setDidBook } = useContext(BookingContext);
  // const [didBook, setDidBook] = useState(false);
  const [inputs, setInputs] = useState({
    bookerEmail: "",
    bookerPhone: "",
    bookerFirstName: "",
    bookerLastName: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (
      inputs.bookerEmail &&
      inputs.bookerPhone &&
      inputs.bookerFirstName &&
      inputs.bookerLastName
    ) {
      return setDisabled(false);
    }
    setDisabled(true);
  }, [inputs]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      time,
      date,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerPhone: inputs.bookerPhone,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });
  };

  return (
    <div className="mt-10 flex flex-col justify-between w-full">
      {didBook ? (
        <div>
          <h2 className="text-xl md:text-3xl font-bold">
            Your table has been booked successfully!
          </h2>
          <p>Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:gap-4">
            <input
              type="text"
              className="border rounded p-3 w-full mb-4"
              placeholder="First name"
              name="bookerFirstName"
              value={inputs.bookerFirstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="border rounded p-3 w-full mb-4"
              placeholder="Last name"
              name="bookerLastName"
              value={inputs.bookerLastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <input
              type="text"
              className="border rounded p-3 w-full mb-4"
              placeholder="Phone number"
              name="bookerPhone"
              value={inputs.bookerPhone}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="border rounded p-3 w-full mb-4"
              placeholder="Email"
              name="bookerEmail"
              value={inputs.bookerEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <input
              type="text"
              className="border rounded p-3 w-full mb-4"
              placeholder="Occasion (optional)"
              name="bookerOccasion"
              value={inputs.bookerOccasion}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="border rounded p-3 w-full mb-4"
              placeholder="Requests (optional)"
              name="bookerRequest"
              value={inputs.bookerRequest}
              onChange={handleInputChange}
            />
          </div>
          <button
            onClick={handleClick}
            disabled={disabled || loading}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default Form;
