import Swal from "sweetalert2";

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
	const today = new Date();
	const dateToCheck = new Date(date);
	const diffTime = Math.abs(today.getTime() - dateToCheck.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays;
};
