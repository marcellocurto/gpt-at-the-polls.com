import { spawn } from "bun";
import { readableStreamToText } from "bun";

const ftpUsername = process.env.FTP_USERNAME;
const ftpPassword = process.env.FTP_PASSWORD;
const ftpServer = process.env.FTP_SERVER;
const localDir = "out/";
const remoteDir = ".";
const ftpPort = "21";

if (!ftpUsername || !ftpPassword || !ftpServer) {
	console.error(
		"Error: FTP_USERNAME, FTP_PASSWORD, and FTP_SERVER environment variables must be set."
	);
	process.exit(1);
}

const parallelTransfers = 5;

const uploadCommand = `set ftp:passive-mode on; mirror -R --verbose --parallel=${parallelTransfers} ${localDir} .; quit`;

console.log(
	`Step 1: Uploading/Updating files from local '${localDir}' to remote '${remoteDir}' on ${ftpServer}:${ftpPort} (${parallelTransfers} parallel transfers)...`
);

const uploadProc = spawn(
	[
		"lftp",
		"-p",
		ftpPort,
		"-u",
		`${ftpUsername},${ftpPassword}`,
		ftpServer,
		"-e",
		uploadCommand,
	],
	{
		stdout: "inherit",
		stderr: "pipe",
	}
);

const uploadExitCode = await uploadProc.exited;
const uploadStderr = await readableStreamToText(uploadProc.stderr);

if (uploadExitCode === 0) {
	console.log("Step 1: Upload/Update completed successfully.");
	if (uploadStderr) {
		console.warn(
			"lftp (upload step) reported the following messages on stderr:"
		);
		console.warn(uploadStderr);
	}

	const deleteCommand = `set ftp:passive-mode on; set mirror:skip-noaccess on; mirror -R --delete --verbose ${localDir} .; quit`;

	console.log(
		`Step 2: Deleting obsolete files on remote '${remoteDir}' on ${ftpServer}:${ftpPort} (sequentially)...`
	);

	const deleteProc = spawn(
		[
			"lftp",
			"-p",
			ftpPort,
			"-u",
			`${ftpUsername},${ftpPassword}`,
			ftpServer,
			"-e",
			deleteCommand,
		],
		{
			stdout: "inherit",
			stderr: "pipe",
		}
	);

	const deleteExitCode = await deleteProc.exited;
	const deleteStderr = (
		await readableStreamToText(deleteProc.stderr)
	).trim();

	let treatDeleteAsSuccess = deleteExitCode === 0;

	if (deleteExitCode !== 0 && deleteStderr) {
		const lines = deleteStderr.split("\n");
		const allLinesAreExpectedErrors = lines.every((line) =>
			/Access failed: 550 (File|Directory) Not Found/.test(line.trim())
		);

		if (allLinesAreExpectedErrors) {
			console.warn(
				"Step 2: lftp exited with code 1, but stderr only contained expected '550 Not Found' errors during deletion. Treating as success."
			);
			console.warn("lftp (delete step) stderr output:");
			console.warn(deleteStderr);
			treatDeleteAsSuccess = true;
		}
	}

	if (treatDeleteAsSuccess) {
		if (deleteExitCode === 0) {
			console.log("Step 2: Deletion completed successfully.");
		}
		if (deleteStderr && deleteExitCode === 0) {
			console.warn(
				"lftp (delete step) reported the following messages on stderr:"
			);
			console.warn(deleteStderr);
		}
		console.log("FTP sync completed successfully (both steps).");
	} else {
		console.error(
			`Step 2: Deletion failed with exit code ${deleteExitCode}.`
		);
		if (deleteStderr) {
			console.error("lftp (delete step) stderr output:");
			console.error(deleteStderr);
		}
		process.exit(deleteExitCode || 1);
	}
} else {
	console.error(
		`Step 1: Upload/Update failed with exit code ${uploadExitCode}.`
	);
	if (uploadStderr) {
		console.error("lftp (upload step) stderr output:");
		console.error(uploadStderr);
	}
	process.exit(uploadExitCode);
}
