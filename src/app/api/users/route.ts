import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (id) {
    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        books: true
      }
    });
    return NextResponse.json(user);
  }

  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name } = body;

  if (!email || !password || !name) {
    return NextResponse.json({ message: "Fields are empty!" }, { status: 415 });
  }

  const users = await prisma.user.findMany();
  const existsEmail = users.find((user) => user.email == email);

  if (existsEmail) {
    return NextResponse.json({ message: "Email is repeat!" }, { status: 400 });
  } else {
    await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    return NextResponse.json({ message: "User was created!" }, { status: 200 });
  }
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
      authorId: id
    }
  })
  await prisma.user.delete({
    where: { id },
  });
  return NextResponse.json({ message: "User was deleted!" }, { status: 200 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { email, password, name } = body;
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
      name
    },
  });
  return NextResponse.json({ message: "User was updated!" }, { status: 200 });
}
