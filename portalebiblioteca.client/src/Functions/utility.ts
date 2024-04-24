import Swal from "sweetalert2";
import { Loan } from "../interfaces/loans.interface";

export const formatData = (data: Date, addDay?: number) => {
	const date = new Date(data);

	if (addDay) {
		date.setDate(date.getDate() + addDay);
	}

	const options = {
		weekday: "long" as const,
		year: "numeric" as const,
		month: "long" as const,
		day: "numeric" as const,
	};

	return capitalizeFirstLetter(date.toLocaleDateString("it-IT", options));
};

export const howManyDaysAgo = (date: Date) => {
	const today = new Date();
	const dateToCompare = new Date(date);

	// difference in days
	const differenceInTime = today.getTime() - dateToCompare.getTime();
	const differenceInDays = differenceInTime / (1000 * 3600 * 24);

	const differenceInDaysRounded = Math.round(differenceInDays);

	switch (differenceInDaysRounded) {
		case 0:
			return (
				"Oggi alle " +
				dateToCompare.toLocaleTimeString("it-IT").slice(0, 5)
			);
		case 1:
			return (
				"Ieri alle " +
				dateToCompare.toLocaleTimeString("it-IT").slice(0, 5)
			);
		default:
			return (
				differenceInDaysRounded +
				" giorni fa alle " +
				dateToCompare.toLocaleTimeString("it-IT").slice(0, 5)
			);
	}
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

export const convertToAisleName = (aisleNumber: number) => {
	switch (aisleNumber) {
		case 110:
			return "Banco del bibliotecario - " + "Corsia " + aisleNumber;
		case 120:
			return "Scaffale prestiti - " + "Corsia " + aisleNumber;
		case 200:
			return "Magazzino " + "Corsia " + aisleNumber;
		default:
			return "Corsia " + aisleNumber;
	}
};

export const isBookAvailableAtDesk = (loan: Loan): string => {
	if (loan.returned) {
		return "Libro restituito";
	}
	switch (loan.item?.shelf.shelfName) {
		case "Banco del bibliotecario - Corsia 110 - A1":
			return "Sì, passa al banco del bibliotecario per ritirarlo";
		case "In prestito":
			return "Ce l'hai tu! Ricordati di restituirlo!";
		default:
			return (
				"No, sarà disponibile al banco del bibliotecario a partire da " +
				formatData(loan.loanDate, 1)
			);
	}
};
