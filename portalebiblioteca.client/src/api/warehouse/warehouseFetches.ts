import { url } from "../../functions/config";
import { fetchWithAuth } from "../interceptor";

export const addToWarehouse = async (quantity: number, idBook: number) => {
	const response = await fetchWithAuth(url + "api/Warehouse/addToWarehouse", {
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
		throw new Error("Failed to add to warehouse");
	}

	return response.json();
};

export const fetchAllWarehouse = async () => {
	const response = await fetchWithAuth(url + "api/Warehouse/1", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch warehouse");
	} else {
		const data = await response.json();
		console.log(data);
	}
};
