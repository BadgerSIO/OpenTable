"use client";
import { useRouter } from "next/navigation";
import { partysize } from "../../../../data";
import DatePicker from "react-datepicker";
import { useState } from "react";
const ReservationCard = () => {
  const router = useRouter();
  const handleFindTime = () => {
    router.push("/reserve/nameofrestaurant");
  };
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };
  return (
    <div className="w-[27%] relative text-reg">
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select
            name=""
            className="py-3 border-b font-light focus:border-b outline-none"
            id=""
          >
            {partysize.map((size) => (
              <option value={size.value}>{size.label}</option>
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
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Time</label>
            <select
              name=""
              id=""
              className="py-3 border-b font-light outline-none"
            >
              <option value="">7:30 AM</option>
              <option value="">9:30 AM</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={handleFindTime}
            className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          >
            Find a Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
