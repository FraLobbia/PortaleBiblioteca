import Swal from "sweetalert2";

export const formatData = (data: string | undefined) => {
	if (data === undefined) return "";
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

	return capitalizeFirstLetter(date.toLocaleDateString("it-IT", options));
};

export const Toast = Swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 2000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.onmouseenter = Swal.stopTimer;
		toast.onmouseleave = Swal.resumeTimer;
	},
});

export function capitalizeFirstLetter(str: string) {
	return str.replace(/\b\w/g, function (char) {
		return char.toUpperCase();
	});
}

export const howManyDaysAgo = (date: string) => {
	// 2024-04-05 12:04:59.9108221
	const today = new Date();
	const dateToCheck = new Date(date);
	const diffTime = Math.abs(today.getTime() - dateToCheck.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
	switch (diffDays) {
		case 0:
			return (
				"Oggi alle " +
				dateToCheck.toLocaleTimeString("it-IT").slice(0, 5)
			);
		case 1:
			return (
				"Ieri alle " +
				dateToCheck.toLocaleTimeString("it-IT").slice(0, 5)
			);
		default:
			return (
				diffDays +
				" giorni fa alle " +
				dateToCheck.toLocaleTimeString("it-IT").slice(0, 5)
			);
	}
};
export const setDarkMode = () => {
	document.querySelector("body")?.setAttribute("data-theme", "dark");
	localStorage.setItem("selectedTheme", "dark");
};
export const setLightMode = () => {
	document.querySelector("body")?.setAttribute("data-theme", "light");
	localStorage.setItem("selectedTheme", "light");
};

export const truncateText = (text: string, maxLength: number) => {
	if (text.length <= maxLength) {
		return text;
	}
	return text.slice(0, maxLength) + "...";
};
