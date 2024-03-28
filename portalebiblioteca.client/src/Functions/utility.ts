export const formatData = (data: string) => {
	const dateParts = data.split("-");
	const year = parseInt(dateParts[0]);
	const month = parseInt(dateParts[1]);
	const day = parseInt(dateParts[2]);

	const date = new Date(year, month - 1, day); // month - 1 perché i mesi in JavaScript partono da 0

	const options = {
		weekday: "long" as const,
		year: "numeric" as const,
		month: "long" as const,
		day: "numeric" as const,
	};

	return date.toLocaleDateString("it-IT", options);
};
