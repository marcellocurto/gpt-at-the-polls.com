import { getBTW2025Records } from "@/lib/airtable/records";
import { describe, expect, test } from "bun:test";

describe("Fetch BTW 2025 Records", () => {
	test(`should fetch records`, async () => {
		const records = await getBTW2025Records();

		console.dir(records, { depth: null });
		expect(records).toBeDefined();
	}, 100000);
});
