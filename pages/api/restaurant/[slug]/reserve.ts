import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { findAvailableTables } from "../../../../services/restaurant/findAvailableTables";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { slug, date, time, partySize } = req.query as {
      slug: string;
      date: string;
      time: string;
      partySize: string;
    };
    const {
      bookerEmail,
      bookerPhone,
      bookerFirstName,
      bookerLastName,
      bookerOccasion,
      bookerRequest,
    } = req.body;
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        tables: true,
        open_time: true,
        close_time: true,
      },
    });
    if (!restaurant) {
      return res.status(400).json({
        errorMessage: "Restaurant not found",
      });
    }
    if (
      new Date(`${date}T${time}`) <
        new Date(`${date}T${restaurant.open_time}`) ||
      new Date(`${date}T${time}`) > new Date(`${date}T${restaurant.close_time}`)
    ) {
      return res.status(400).json({
        errorMessage: "Restaurant is not open",
      });
    }
    const searchTimesWithTables = await findAvailableTables({
      date,
      time,
      res,
      restaurant,
    });
    if (!searchTimesWithTables) {
      return res.status(400).json({
        errorMessage: "Invalid request",
      });
    }
    const searchTimeWithTables = searchTimesWithTables.find((t) => {
      return t.date.toISOString() === new Date(`${date}T${time}`).toISOString();
    });
    let tablesCount: {
      2: number[];
      4: number[];
      6: number[];
      8: number[];
    } = {
      2: [],
      4: [],
      6: [],
      8: [],
    };
    searchTimeWithTables?.tables.forEach((table) => {
      if (table.seats === 2) {
        tablesCount[2].push(table.id);
      } else if (table.seats === 4) {
        tablesCount[4].push(table.id);
      } else if (table.seats === 6) {
        tablesCount[6].push(table.id);
      } else {
        tablesCount[8].push(table.id);
      }
    });
    let tablesToBook: number[] = [];
    let seatsRemaining = parseInt(partySize);
    while (seatsRemaining > 0) {
      if (seatsRemaining >= 7) {
        if (tablesCount[8].length) {
          tablesToBook.push(tablesCount[8][0]);
          tablesCount[8].shift();
          seatsRemaining = seatsRemaining - 8;
        } else if (tablesCount[6].length) {
          tablesToBook.push(tablesCount[6][0]);
          tablesCount[6].shift();
          seatsRemaining = seatsRemaining - 6;
        } else if (tablesCount[4].length) {
          tablesToBook.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
        } else {
          tablesToBook.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
        }
      } else if (seatsRemaining >= 5) {
        if (tablesCount[6].length) {
          tablesToBook.push(tablesCount[6][0]);
          tablesCount[6].shift();
          seatsRemaining = seatsRemaining - 6;
        } else if (tablesCount[4].length) {
          tablesToBook.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
        } else if (tablesCount[2].length) {
          tablesToBook.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
        } else {
          tablesToBook.push(tablesCount[8][0]);
          tablesCount[8].shift();
          seatsRemaining = seatsRemaining - 8;
        }
      } else if (seatsRemaining >= 3) {
        if (tablesCount[4].length) {
          tablesToBook.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
        } else if (tablesCount[2].length) {
          tablesToBook.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
        } else if (tablesCount[6].length) {
          tablesToBook.push(tablesCount[6][0]);
          tablesCount[6].shift();
          seatsRemaining = seatsRemaining - 6;
        } else {
          tablesToBook.push(tablesCount[8][0]);
          tablesCount[8].shift();
          seatsRemaining = seatsRemaining - 8;
        }
      } else {
        if (tablesCount[2].length) {
          tablesToBook.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
        } else if (tablesCount[4].length) {
          tablesToBook.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
        } else if (tablesCount[6].length) {
          tablesToBook.push(tablesCount[6][0]);
          tablesCount[6].shift();
          seatsRemaining = seatsRemaining - 6;
        } else {
          tablesToBook.push(tablesCount[8][0]);
          tablesCount[8].shift();
          seatsRemaining = seatsRemaining - 8;
        }
      }
    }
    const booking = await prisma.booking.create({
      data: {
        number_of_people: parseInt(partySize),
        booking_time: new Date(`${date}T${time}`),
        booker_email: bookerEmail,
        booker_phone: bookerPhone,
        booker_first_name: bookerFirstName,
        booker_last_name: bookerLastName,
        booker_occasion: bookerOccasion,
        booker_request: bookerRequest,
        restaurant_id: restaurant.id,
      },
    });
    const bookingsOnTablesData = tablesToBook.map((table_id) => {
      return {
        table_id,
        booking_id: booking.id,
      };
    });
    await prisma.bookingsOnTables.createMany({
      data: bookingsOnTablesData,
    });
    return res.status(200).json(booking);
  }
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?date=2023-09-18&time=14:30:00.000Z&partySize=4
