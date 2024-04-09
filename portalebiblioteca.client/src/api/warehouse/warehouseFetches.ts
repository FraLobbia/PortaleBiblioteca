import Swal from "sweetalert2";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../interceptor";

export const addToWarehouse = async (quantity: number, idBook: number) => {
	try {
		const response = await fetchWithAuth(url + "api/Warehouse/receive", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				quantity,
				idBook,
			}),
		});

		if (!response.ok) {
			response.json().then((err) => {
				Swal.fire({
					title: `${err.message}`,
					icon: "error",
					footer: `Errore ${response.status}`,
				});
			});
		} else {
			Swal.fire({
				title: "Libri ricevuti!",
				text: "I libri sono in magazzino in attesa di essere riposti negli scaffali!",
				icon: "success",
			});
		}
	} catch (error) {
		console.error(error);
	}
};

export const fetchAllWarehouse = async () => {
	try {
		const response = await fetchWithAuth(url + "api/Warehouse", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			response.json().then((err) => {
				Swal.fire({
					title: `${err.message}`,
					icon: "error",
					footer: `Errore ${response.status}`,
				});
			});
		} else {
			console.log("Warehouse: ", await response.json());
		}
	} catch (error) {
		console.error(error);
	}
};
