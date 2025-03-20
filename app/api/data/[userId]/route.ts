import { NextResponse } from "next/server";
import dbConnect from "../../../../config/database";
import vehicleData from "../../../../models/vehicledata";

interface Params {
  params: { userId: string };
}

interface ErrorResponse {
  message: string;
  error: string;
}

interface SuccessResponse<T> {
  message?: string;
  data: T;
}
export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required." },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    // Ensure userData fetches records with matching userId
    const userData = await vehicleData.find({ userId }).lean().exec();

    if (!userData || userData.length === 0) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    return NextResponse.json({ data: userData }, { status: 200 });
  } catch (error: unknown) {
    console.error("GET Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";

    return NextResponse.json(
      { message: "Internal server error.", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: Params) {
  const { userId } = params;

  try {
    await dbConnect();

    const body = await req.json();
    const {
      vehiclereg,
      ownername,
      zinarastart,
      zinaraend,
      expiresIn,
      phonenumber,
      premium,
    } = body;

    if (
      !vehiclereg ||
      !ownername ||
      !zinarastart ||
      !zinaraend ||
      !expiresIn ||
      !phonenumber ||
      premium == null
    ) {
      return NextResponse.json<ErrorResponse>(
        { message: "All fields are required.", error: "Missing data" },
        { status: 400 }
      );
    }

    const newData = new vehicleData({
      userId,
      vehiclereg,
      ownername,
      zinarastart,
      zinaraend,
      expiresIn,
      phonenumber,
      premium,
    });

    await newData.save();

    return NextResponse.json<SuccessResponse<typeof newData>>(
      { message: "Data saved successfully.", data: newData },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";

    console.error("POST Error:", errorMessage);

    const response: ErrorResponse = {
      message: "Internal server error.",
      error: errorMessage,
    };

    return NextResponse.json<ErrorResponse>(response, { status: 500 });
  }
}
