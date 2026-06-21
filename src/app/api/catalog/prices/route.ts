import { NextResponse } from "next/server";
import { getMergedOnlinePrices } from "@/lib/commerce/online-prices-store";

export async function GET() {
  return NextResponse.json({ prices: getMergedOnlinePrices() });
}
