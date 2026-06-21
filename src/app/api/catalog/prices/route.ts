import { NextResponse } from "next/server";
import { getMergedOnlinePrices } from "@/lib/commerce/online-prices-store";

export async function GET() {
  const prices = await getMergedOnlinePrices();
  return NextResponse.json({ prices });
}
