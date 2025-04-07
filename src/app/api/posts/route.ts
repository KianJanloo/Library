import { NextResponse } from "next/server";

let posts = [
  {
    id: "1",
    name: "Name 1",
    describe: "Describe 1",
  },
  {
    id: "2",
    name: "Name 2",
    describe: "Describe 2",
  },
  {
    id: "3",
    name: "Name 3",
    describe: "Describe 3",
  },
  {
    id: "4",
    name: "Name 4",
    describe: "Describe 4",
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const post = posts.find((item) => item.id === id);
    return NextResponse.json(post ?? {});
  }

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { id, name, describe } = body;

  if (!id || !name || !describe) {
    return new NextResponse(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const exits = posts.find((item) => item.id === id);
  if (exits) {
    return new Response(
      JSON.stringify({ error: "Post with this ID already exists" }),
      {
        status: 409,
      }
    );
  }

  const newPost = { id, name, describe };
  posts.push(newPost);

  return NextResponse.json(posts);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, name, describe } = body;

  const index = posts.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "id is not found" }, { status: 404 });
  }

  if (name) posts[index].name = name;
  if (describe) posts[index].describe = describe;

  return NextResponse.json({ message: "Post updated", post: posts[index] });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  const existsID = posts.find((item) => item.id === id);
  if (!existsID) {
    return NextResponse.json({ error: "id is not found" }, { status: 404 });
  } else {
    const postFilter = posts.filter((item) => item.id !== id);
    posts = postFilter;
    return NextResponse.json({ message: "Post Deleted" });
  }
}
