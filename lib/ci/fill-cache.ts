import {
	createCacheFromBillsRecords,
	createCacheFromCongressRecords,
	createCacheFromModelsRecords,
	createCacheFromPeopleRecords,
	createCacheFromQueriesRecords,
	createCacheFromVotesRecords,
} from "@/lib/airtable/cache";

console.log("Filling cache");
await createCacheFromCongressRecords();
console.log("Congress cache filled");
await createCacheFromModelsRecords();
console.log("Models cache filled");
await createCacheFromPeopleRecords();
console.log("People cache filled");
await createCacheFromQueriesRecords();
console.log("Queries cache filled");
await createCacheFromVotesRecords();
console.log("Votes cache filled");
await createCacheFromBillsRecords();
console.log("Bills cache filled");
