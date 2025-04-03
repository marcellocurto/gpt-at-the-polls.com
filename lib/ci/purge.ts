const bunnyApiKey = process.env.BUNNY_NET_API_KEY;
const bunnyPullZoneId = process.env.BUNNY_NET_API_GPT_AT_THE_POLLS_ID;

async function purge() {
	if (!bunnyApiKey || !bunnyPullZoneId) {
		console.error(
			"Error: BUNNY_NET_API_KEY and BUNNY_NET_API_GPT_AT_THE_POLLS_ID environment variables must be set for cache clearing."
		);
		process.exit(1);
	}

	console.log("Attempting to clear Bunny.net cache via fetch...");

	try {
		const response = await fetch(
			`https://api.bunny.net/pullzone/${bunnyPullZoneId}/purgeCache`,
			{
				method: "POST",
				headers: {
					AccessKey: bunnyApiKey,
				},
			}
		);

		if (response.ok) {
			console.log("Bunny.net cache cleared successfully.");
		} else {
			console.error(
				`Bunny.net cache clearing failed with status: ${response.status} ${response.statusText}`
			);
			const responseBody = await response.text();
			console.error("Response body:", responseBody);
			process.exit(1);
		}
	} catch (error) {
		console.error("Error during fetch request to Bunny.net:", error);
		process.exit(1);
	}
}

purge();
