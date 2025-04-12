import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

interface IRegisterBody {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export async function POST(req: Request) {
  const body = await req.json() as IRegisterBody;
  const { email, name, phone, password } = body;

  if (!email || !name || !password) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      password: hashedPassword,
      name: name,
      phone: phone || "",
      email: email,
    },
  });

  return NextResponse.json({ message: "User was added!", user: newUser }, { status: 201 });
}
