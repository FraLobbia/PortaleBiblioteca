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

export const fetchBookList = () => async (dispatch: AppDispatch) => {
	try {
		const response = await fetchWithAuth(url + "Books", {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const booksList = await response.json();
			console.log("fetchBookList", booksList);
			dispatch(setBooks(booksList));
		} else {
			throw new Error("Errore nel recupero dei risultati");
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
			const book = await response.json();
			console.log("fetchBookById", book);
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
	(editedBook: BookToEdit) => async (dispatch: AppDispatch) => {
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

			if (response.ok) {
				const booksList = await response.json();
				console.log("Lista aggiornata: ", booksList);
				dispatch(setBooks(booksList));
			} else {
				throw new Error("Errore nel recupero dei risultati");
			}
		} catch (error) {
			// Handle errors here, if necessary
			console.error("Errore nel fetch:", error);
		}
	};

export const fetchBookDelete =
	(id: string, navigate: any) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(url + "Books/" + id, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const booksList: Book[] = await response.json();
			console.log("Cancellato libro: ", booksList);
			dispatch(setBooks(booksList));
			if (response.ok) {
				Swal.fire({
					title: "Cancellato!",
					text: "Il file è stato cancellato.",
					icon: "success",
				}).then(() => {
					navigate("/catalogo");
				});
			} else {
				throw new Error(response.status.toString());
			}
		} catch (error) {
			dispatch(fetchBookList());
			// Handle errors here, if necessary
			console.error("Errore nella fetch:", error);
			Swal.fire({
				title: "Si è verificato un problema!",
				text: `${error}`,
				icon: "error",
			}).then(() => {
				navigate("/catalogo");
			});
		}
	};
