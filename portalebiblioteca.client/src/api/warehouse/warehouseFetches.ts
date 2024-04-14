import Swal from "sweetalert2";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../interceptor";
import { AppDispatch } from "../../redux/store/store";
import { ItemsEntity } from "../../interfaces/warehouse.interface";
import { setBookEntities } from "../../redux/slicers/bookSlice";

export const addToWarehouse =
	(quantity: number, idBook: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(
				url + "api/Warehouse/receive",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						quantity,
						idBook,
					}),
				}
			);

			if (!response.ok) {
				response.json().then((err) => {
					Swal.fire({
						title: `${err.message}`,
						icon: "error",
						footer: `Errore ${response.status}`,
					});
				});
			} else {
				const bookEntities: ItemsEntity[] = await response.json();
				dispatch(setBookEntities(bookEntities));
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

export const fetchItemsEntityByBookId =
	(idBook: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(
				url + `api/Warehouse/book/${idBook}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				response.json().then((err) => {
					Swal.fire({
						title: `${err.message}`,
						icon: "error",
						footer: `Errore ${response.status}`,
					});
				});
			} else {
				const items: ItemsEntity[] = await response.json();
				console.log("ItemsEntity: ", items);
				dispatch(setBookEntities(items));
			}
		} catch (error) {
			console.error(error);
		}
	};
