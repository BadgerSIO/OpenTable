import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import prisma from "../../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, date, time, partySize } = req.query as {
    slug: string;
    date: string;
    time: string;
    partySize: string;
  };
  if (!date || !time || !partySize) {
    return res.status(400).json({
      errorMessage: "Invalid request",
    });
  }
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;
  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
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
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });
  if (!restaurant) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }
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
  const availabilities = searchTimesWithTables
    .map((t) => {
      const sumSeats = t.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);
      return {
        time: t.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${date}T${availability.time}`) >=
        new Date(`${date}T${restaurant.open_time}`);
      const timeIsBeforeClosingHour =
        new Date(`${date}T${availability.time}`) <=
        new Date(`${date}T${restaurant.close_time}`);
      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });
  return res.json(availabilities);
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?date=2023-09-05&time=01:30:00.000Z&partySize=4
