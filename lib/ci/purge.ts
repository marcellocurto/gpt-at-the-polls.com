import { spawn } from "bun";

const bunnyApiKey = process.env.BUNNY_NET_API_KEY;
const bunnyPullZoneId = process.env.BUNNY_NET_API_GPT_AT_THE_POLLS_ID;

if (!bunnyApiKey || !bunnyPullZoneId) {
	console.error(
		"Error: BUNNY_NET_API_KEY and BUNNY_NET_API_GPT_AT_THE_POLLS_ID environment variables must be set for cache clearing."
	);
	process.exit(1);
}

console.log("Attempting to clear Bunny.net cache...");
const bunnyProc = spawn(
	[
		"curl",
		"-X",
		"POST",
		`https://api.bunny.net/pullzone/${bunnyPullZoneId}/purgeCache`,
		"-H",
		`AccessKey: ${bunnyApiKey}`,
	],
	{
		stdout: "inherit",
		stderr: "inherit",
	}
);

const bunnyExitCode = await bunnyProc.exited;

if (bunnyExitCode === 0) {
	console.log("Bunny.net cache cleared successfully.");
} else {
	console.error(
		`Bunny.net cache clearing failed with exit code ${bunnyExitCode}.`
	);
	process.exit(bunnyExitCode);
}
