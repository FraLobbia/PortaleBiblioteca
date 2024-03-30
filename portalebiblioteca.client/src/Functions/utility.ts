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

	return date.toLocaleDateString("it-IT", options);
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
