import Swal from "sweetalert2";
import { url } from "../../functions/config";
import {
	Book,
	BookCreateForm,
	BookToEdit,
} from "../../interfaces/book.interface";
import { setBooks, setCurrentBook } from "../../redux/slicers/bookSlice";
import { AppDispatch } from "../../redux/store/store";
import { fetchWithAuth } from "../interceptor";
import { Toast } from "../../functions/utility";
import { NavigateFunction } from "react-router-dom";

export const fetchBookList = () => async (dispatch: AppDispatch) => {
	try {
		const response = await fetchWithAuth(url + "Books", {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			response.json().then((err) => {
				Toast.fire({
					icon: "error",
					title: `${err.message}`,
				});
			});
		} else {
			const booksList: Book[] = await response.json();
			console.info("Lista dei libri", booksList);
			dispatch(setBooks(booksList));
		}
	} catch (error) {
		// Handle errors here, if necessary
		console.error("Errore nel fetch:", error);
	}
};

export const fetchBookById = (id: string) => async (dispatch: AppDispatch) => {
	try {
		const response = await fetchWithAuth(url + "Books/" + id, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const book: Book = await response.json();
			console.info("Dettagli del libro", book);
			dispatch(setCurrentBook(book));
		} else {
			throw new Error("Errore nel recupero dei risultati");
		}
	} catch (error) {
		// Handle errors here, if necessary
		console.error("Errore nel fetch:", error);
	}
};

export const fetchBookCreate =
	(newBook: BookCreateForm) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(url + "Books/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newBook),
			});

			if (response.ok) {
				const updatedBookList = await response.json();
				console.log(
					"Lista aggiornata con libro aggiunto: ",
					updatedBookList
				);
				dispatch(setBooks(updatedBookList));
			} else {
				throw new Error("Errore nel recupero dei risultati");
			}
		} catch (error) {
			// Handle errors here, if necessary
			console.error("Errore nel fetch:", error);
		}
	};

export const fetchBookEdit =
	(editedBook: BookToEdit, navigate: NavigateFunction) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(
				url + "Books/" + editedBook.idBook,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(editedBook),
				}
			);
			if (!response.ok) {
				response.json().then((err) => {
					Swal.fire({
						title: "Si è verificato un problema!",
						text: `Errore ${response.status}: ${err.message}`,
						icon: "error",
					});
				});
			} else {
				const booksList: Book[] = await response.json();
				console.log("Lista aggiornata: ", booksList);
				dispatch(setBooks(booksList));
				Swal.fire({
					title: "Modificato!",
					text: "Il file è stato modificato con successo.",
					icon: "success",
					timer: 1500,
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			navigate("/catalogo");
		}
	};

export const fetchBookDelete =
	(id: string, navigate: NavigateFunction) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(url + "Books/" + id, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				response.json().then((err) => {
					Swal.fire({
						title: "Si è verificato un problema!",
						text: `Errore ${response.status}: ${err.message}`,
						icon: "error",
					});
				});
			} else {
				const booksList: Book[] = await response.json();
				console.log("Lista aggiornata: ", booksList);
				dispatch(setBooks(booksList));
				Swal.fire({
					title: "Eliminato!",
					text: "Il file è stato eliminato con successo.",
					icon: "success",
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			navigate("/catalogo");
		}
	};
