import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    const errors: string[] = [];
    const { email, password } = body;
    const validatorSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "email is invalid",
      },

      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "password is invalid",
      },
    ];
    validatorSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });
    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "user email or password is invalid" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ errorMessage: "user email or password is invalid" });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);
    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });
    return res.status(200).json({
      fisrName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    });
  }
  return res.status(404).json("Unknown endpoint");
}
