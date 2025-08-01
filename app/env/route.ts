import { checkRequiredEnvVars } from "@/lib/utils";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
	checkRequiredEnvVars();
	return NextResponse.json({ success: true });
}
