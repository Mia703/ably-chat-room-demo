import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          message: "login: email and password are required",
        },
        { status: 400 },
      );
    }

    const user = await xata.db.Users.filter({ email }).getFirst();

    if (!user) {
      return NextResponse.json(
        {
          message: "login: user not in db",
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message: "login: auth successful",
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("login: Internal server error.", error);
    return NextResponse.json(
      {
        message:
          "login: Internal server error. The server has encountered a situation it does not know how to handle.",
      },
      { status: 500 },
    );
  }
}
