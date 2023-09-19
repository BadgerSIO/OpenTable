"use client";
import { partysize as partySizes, times } from "../../../../data";
import DatePicker from "react-datepicker";
import { useState } from "react";
import useAvailabilities from "../../../../hooks/useAvailabilities";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import {
  convertToDisplayTime,
  Time,
} from "../../../utils/convertToDisplayTime";
const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const { loading, error, data, setData, fetchAvailabilities } =
    useAvailabilities();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [partySize, setPartySize] = useState("2");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleFindTime = () => {
    fetchAvailabilities({
      date,
      time,
      slug,
      partySize,
    });
  };
  const handleDateChange = (date: Date | null) => {
    setData(null);
    if (date) {
      setDate(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };
  const filterTimeByRestaurentOpenWindow = () => {
    // Get the current time
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Get the opening hour and minute
    const [openingHour, openingMinute] = openTime.split(":").map(Number);

    // Filter times based on restaurant opening hours and current time
    const filteredTimes = times.filter((time) => {
      const [hour, minute] = time.time.split(":").map(Number);

      // Check if the time is within the restaurant's opening hours and in the future
      if (
        (hour > openingHour ||
          (hour === openingHour && minute >= openingMinute)) &&
        hour >= parseInt(openTime.split(":")[0]) &&
        (hour < parseInt(closeTime.split(":")[0]) ||
          (hour === parseInt(closeTime.split(":")[0]) &&
            minute < parseInt(closeTime.split(":")[1]))) &&
        (hour > currentHour ||
          (hour === currentHour && minute >= currentMinute))
      ) {
        return true;
      }

      return false;
    });

    return filteredTimes;
  };
  const [time, setTime] = useState(filterTimeByRestaurentOpenWindow()[0].time);

  console.log();
  return (
    <div className="w-[27%] relative text-reg">
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select
            name="partySize"
            className="py-3 border-b font-light focus:border-b outline-none"
            id=""
            value={partySize}
            onChange={(e) => {
              setData(null);
              setPartySize(e.target.value);
            }}
          >
            {partySizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="py-3 border-b outline-none focus:border-b max-w-[100%]"
              dateFormat={"MMMM d"}
              minDate={new Date()} // Set minDate to the current date
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Time</label>
            <select
              name=""
              id=""
              className="py-3 border-b font-light outline-none"
              value={time}
              onChange={(e) => {
                setData(null);
                setTime(e.target.value);
              }}
            >
              {filterTimeByRestaurentOpenWindow().map((time) => (
                <option key={time.time} value={time.time}>
                  {time.displayTime}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={handleFindTime}
            className={`${
              loading ? "bg-slate-900" : "bg-red-600"
            } rounded w-full px-4 text-white font-bold h-16`}
            disabled={loading}
          >
            {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
          </button>
        </div>
        {data && data.length ? (
          <div className="mt-10">
            <h3>Select a time</h3>
            <div className="flex flex-wrap gap-5 mt-3">
              {data.map((time) => {
                return time.available ? (
                  <Link
                    href={`/reserve/${slug}?date=${date}T${time.time}&partySize=${partySize}`}
                    className="bg-red-600 py-2 px-3 rounded text-white text-sm font-bold"
                  >
                    {convertToDisplayTime(time.time as Time)}
                  </Link>
                ) : (
                  <div className="bg-gray-600 py-2 px-3 rounded min-w-[80px] min-h-[36px]"></div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ReservationCard;
