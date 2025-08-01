import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function checkRequiredEnvVars() {
	const requiredEnvVars = ["API_URL"];
	requiredEnvVars.forEach((envVar) => {
		if (!process.env[envVar]) {
			throw new Error(`Environment variable ${envVar} is not set`);
		}
	});
}
