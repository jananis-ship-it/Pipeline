import { NextResponse } from "next/server";
import { getMockDeals } from "@/data/mockDeals";

export async function GET() {
  const deals = getMockDeals();
  return NextResponse.json(deals);
}
