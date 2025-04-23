export const delay = async (ms = 0, log = false) => {
	if (!log) {
		return await new Promise((resolve) => setTimeout(resolve, ms));
	}

	const seconds = Math.ceil(ms / 1000);
	let remaining = seconds;

	return await new Promise((resolve) => {
		console.log(`Waiting... ${remaining} seconds remaining`);

		const interval = setInterval(() => {
			remaining--;
			if (remaining > 0) {
				console.log(`Waiting... ${remaining} seconds remaining`);
			} else {
				clearInterval(interval);
			}
		}, 1000);

		setTimeout(() => {
			clearInterval(interval);
			resolve(undefined);
		}, ms);
	});
};

export function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}
