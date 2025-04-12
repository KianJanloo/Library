import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface ILoginBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ILoginBody;
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not exists" }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { message: "your password is not correct!" },
        { status: 404 }
      );
    }

    const tokenData = {
      id: user.id,
    };
    const token = await jwt.sign(tokenData, "my secret", {
      expiresIn: "1d",
    });

    const res = NextResponse.json(
      { message: "Login success!", token: token },
      { status: 201 }
    );
    res.cookies.set({
      name: "token",
      value: token,
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
