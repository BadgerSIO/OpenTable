import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { findAvailableTables } from "../../../../services/restaurant/findAvailableTables";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
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
        return res.status(404).json({
          errorMessage: "Restaurant not found",
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
    } catch (error) {
      console.error("An error occurred:", error);
      return res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
}
