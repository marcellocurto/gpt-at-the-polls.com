const bunnyApiKey = process.env.BUNNY_NET_API_KEY;
const pullZoneIdsEnvVar = process.env.BUNNY_NET_PULL_ZONE_IDS;

async function purge() {
	if (!bunnyApiKey || !pullZoneIdsEnvVar) {
		console.error(
			"Error: BUNNY_NET_API_KEY and BUNNY_NET_PULL_ZONE_IDS (comma-separated) environment variables must be set for cache clearing."
		);
		process.exit(1);
	}

	const pullZoneIds = pullZoneIdsEnvVar
		.split(",")
		.map((id) => id.trim())
		.filter((id) => id);

	if (pullZoneIds.length === 0) {
		console.log(
			"No pull zone IDs found in BUNNY_NET_PULL_ZONE_IDS after trimming. Nothing to purge."
		);
		process.exit(0);
	}

	console.log(
		`Attempting to clear Bunny.net cache for ${pullZoneIds.length} pull zone(s): ${pullZoneIds.join(", ")}`
	);

	let allSucceeded = true;

	for (const pullZoneId of pullZoneIds) {
		console.log(`\nPurging cache for pull zone ID: ${pullZoneId}`);
		try {
			const response = await fetch(
				`https://api.bunny.net/pullzone/${pullZoneId}/purgeCache`,
				{
					method: "POST",
					headers: {
						AccessKey: bunnyApiKey,
					},
				}
			);

			if (response.ok) {
				console.log(
					`Bunny.net cache cleared successfully for pull zone ID: ${pullZoneId}.`
				);
			} else {
				console.error(
					`Bunny.net cache clearing failed for pull zone ID: ${pullZoneId} with status: ${response.status} ${response.statusText}`
				);
				const responseBody = await response.text();
				console.error("Response body:", responseBody);
				allSucceeded = false;
			}
		} catch (error) {
			console.error(
				`Error during fetch request to Bunny.net for pull zone ID: ${pullZoneId}:`,
				error
			);
			allSucceeded = false;
		}
	}

	if (!allSucceeded) {
		console.error("\nOne or more pull zone cache purges failed.");
		process.exit(1);
	} else {
		console.log("\nAll specified pull zone caches purged successfully.");
	}
}

purge();
