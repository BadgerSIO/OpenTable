import { Table } from "@prisma/client";
import { NextApiResponse } from "next";
import { times } from "../../data";
import prisma from "../../lib/prisma";

export const findAvailableTables = async ({
  time,
  date,
  res,
  restaurant,
}: {
  time: string;
  date: string;
  res: NextApiResponse;
  restaurant: {
    tables: Table[];
    open_time: string;
    close_time: string;
  };
}) => {
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;
  if (!searchTimes) {
    return false;
  }
  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${date}T${searchTimes[0]}`),
        lte: new Date(`${date}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });
  let bookingTablesObj: { [key: string]: { [key: number]: true } } = {};
  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });

  const tables = restaurant.tables;
  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${date}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });
  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) return false;
      }
      return true;
    });
  });
  return searchTimesWithTables;
};
