import { spawn } from "bun";

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

const ftpCommand = `set ftp:passive-mode on; mirror -R --delete --verbose --parallel=${parallelTransfers} ${localDir} .; quit`;

console.log(
	`Attempting to sync local '${localDir}' contents to remote '${remoteDir}' on ${ftpServer}:${ftpPort} (passive mode, ${parallelTransfers} parallel transfers)...`
);

const ftpProc = spawn(
	[
		"lftp",
		"-p",
		ftpPort,
		"-u",
		`${ftpUsername},${ftpPassword}`,
		ftpServer,
		"-e",
		ftpCommand,
	],
	{
		stdout: "inherit",
		stderr: "inherit",
	}
);

const ftpExitCode = await ftpProc.exited;

if (ftpExitCode === 0) {
	console.log("FTP sync completed successfully.");
} else {
	console.error(`FTP sync failed with exit code ${ftpExitCode}.`);
	process.exit(ftpExitCode);
}
