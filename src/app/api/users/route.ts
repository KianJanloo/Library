import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (id) {
    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        email: true,
        id: true,
        name: true,
        phone: true,
        books: true,
        password: false,
      },
    });
    return NextResponse.json(user);
  }

  const users = await prisma.user.findMany({
    select: {
      email: true,
      id: true,
      name: true,
      phone: true,
      books: true,
      password: false,
    },
  });
  return NextResponse.json(users);
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const id = Number(body.id);

  if (!id) {
    return NextResponse.json({ message: "ID is not found" }, { status: 404 });
  }

  const existsID = await prisma.user.findUnique({
    where: { id },
  });
  if (!existsID) {
    return NextResponse.json({ message: "ID is not found!" }, { status: 400 });
  }

  await prisma.books.deleteMany({
    where: {
      authorId: id,
    },
  });
  await prisma.user.delete({
    where: { id },
  });
  return NextResponse.json({ message: "User was deleted!" }, { status: 200 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { email, password, name, phone } = body;
  const id = Number(body.id);

  if (!id || !password || !email || !name) {
    return NextResponse.json({ message: "Fields are empty!" }, { status: 400 });
  }

  const existsID = await prisma.user.findUnique({
    where: { id },
  });
  if (!existsID) {
    return NextResponse.json({ message: "ID is not found!" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id },
    data: {
      email,
      password,
      name,
      phone,
    },
  });
  return NextResponse.json({ message: "User was updated!" }, { status: 200 });
}
