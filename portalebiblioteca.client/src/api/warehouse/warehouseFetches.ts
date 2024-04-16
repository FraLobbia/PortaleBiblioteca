import Swal from "sweetalert2";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../interceptor";
import { AppDispatch } from "../../redux/store/store";
import { ItemsEntity, MoveObject } from "../../interfaces/warehouse.interface";
import { setBookEntities } from "../../redux/slicers/bookSlice";
import { fetchBookById } from "../booksCatalog/bookCRUDFetches";
import {
	setBays,
	setHeights,
	setSourceMaxQuantity,
} from "../../redux/slicers/warehouseSlice";

export const fetchAddToWarehouse =
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
				dispatch(fetchBookById(idBook));
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

export const fetchBaysByAisleId =
	(idAisle: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(
				url + `api/Warehouse/${idAisle}/bays`,
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
				const bays = await response.json();
				dispatch(setBays(bays));
				console.log("Baie della corsia " + idAisle + " :", bays);
			}
		} catch (error) {
			console.error(error);
		}
	};

export const fetchHeightsByBayId =
	(idAisle: number, idBay: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(
				url + `api/Warehouse/${idAisle}/${idBay}/heights`,
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
				const heights: string[] = await response.json();
				dispatch(setHeights(heights));
			}
		} catch (error) {
			console.error(error);
		}
	};

export const getMaxQuantityInTheShelf =
	(IdShelf: number, idBook: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(
				url + `api/Warehouse/${IdShelf}/book/${idBook}`,
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
				const maxQuantity: number = await response.json();
				dispatch(setSourceMaxQuantity(maxQuantity));
				return maxQuantity;
			}
		} catch (error) {
			console.error(error);
		}
	};

export const fetchMove =
	(move: MoveObject) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(url + "api/Warehouse/move", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(move),
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
					title: "Libro spostato!",
					text: "Il libro è stato spostato con successo!",
					icon: "success",
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

export const fetchReservedToBePicked = () => async (dispatch: AppDispatch) => {
	try {
		const response = await fetchWithAuth(
			url + "api/Warehouse/reservedToBePicked",
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
			const reserved = await response.json();
			console.log("Reserved to be picked: ", reserved);
		}
	} catch (error) {
		console.error(error);
	}
};
