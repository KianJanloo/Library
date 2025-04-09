import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (id) {
    const book = await prisma.books.findFirst({
      where: { id },
      include: {
        author: true
      }
    });
    return NextResponse.json(book ?? {});
  }

  const books = await prisma.books.findMany();
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, describe, image, price, authorId } = body;

  if (!name || !describe || !price || !authorId || !image) {
    return new NextResponse(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  await prisma.books.create({
    data: {
      authorId: authorId,
      describe: describe,
      image: image,
      name: name,
      price: price,
    },
  });
  return NextResponse.json(
    { message: "The book added to library !" },
    { status: 200 }
  );
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { name, describe, authorId, image, price } = body;
  const id = Number(body.id);

  if (!id || !name || !describe || !price || !authorId || !image) {
    return new NextResponse(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const book = await prisma.books.findFirst({
    where: { id },
  });
  if (!book) {
    return NextResponse.json(
      { message: "The ID book is not defined" },
      { status: 404 }
    );
  }

  await prisma.books.update({
    where: { id },
    data: {
      authorId: authorId,
      describe: describe,
      image: image,
      name: name,
      price: price,
    },
  });
  return NextResponse.json({ message: "The book updated" }, { status: 200 });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const id = Number(body.id);

  if (!id) {
    return NextResponse.json(
      { message: "The book id is not found !" },
      { status: 404 }
    );
  }

  await prisma.books.delete({
    where: { id },
  });
  return NextResponse.json({ message: "The book deleted" }, { status: 200 });
}
