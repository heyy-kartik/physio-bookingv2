import { NextRequest, NextResponse } from "next/server";
import { insertAppointment } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, preferredDate, preferredTime, message, consent } = body;

    if (!name || !phone || !service || !preferredDate || !preferredTime || !consent) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const result = insertAppointment({
      name,
      phone,
      email,
      service,
      preferredDate,
      preferredTime,
      message,
      consent: Boolean(consent),
    });

    return NextResponse.json({ ok: true, id: result.id });
  } catch (err) {
    console.error("Failed to save appointment:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
