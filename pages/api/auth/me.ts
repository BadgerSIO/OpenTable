import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearertoken = req.headers["authorization"] as string;
  const token = bearertoken?.split(" ")[1];
  const payload = jwt.decode(token) as { email: string };
  if (!payload.email) {
    return res.status(401).json({
      errorMessage: "Unauthorized request",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });
  if (!user) {
    return res.status(401).json({
      errorMessage: "User not logged in",
    });
  }
  return res.status(200).json({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    city: user.city,
  });
}
