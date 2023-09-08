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
    const { firstName, lastName, email, phone, city, password } = body;
    console.log("hello here");
    const validatorSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "Last name is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "email is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "phone number is invalid",
      },
      {
        valid: validator.isLength(city, {
          min: 1,
          max: 20,
        }),
        errorMessage: "city is invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "password is not strong",
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
    const emailExsist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (emailExsist) {
      return res
        .status(400)
        .json({ errorMessage: "User with same email already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        email,
        phone,
        city,
      },
    });
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
