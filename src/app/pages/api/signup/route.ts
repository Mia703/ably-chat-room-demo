import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email } = await request.json();

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { message: "signup: full name and email required" },
        { status: 400 },
      );
    }

    const get_user = await xata.db.Users.filter({ email }).getFirst();

    if (!get_user) {
      const user = await xata.db.Users.create({
        firstName,
        lastName,
        email,
      });

      if (!user) {
        return NextResponse.json(
          {
            message: { message: "signup: unable to create user", key: "error" },
          },
          { status: 200 },
        );
      }

      return NextResponse.json(
        {
          message: {
            message: "signup: auth successful",
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: { message: "signup: user already in db", key: "exists" } },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("signup: Internal server error", error);
    return NextResponse.json(
      { message: "signup: Internal server error." },
      { status: 500 },
    );
  }
}
