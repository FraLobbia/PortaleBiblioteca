import { url } from "../../functions/config";
import { BookCreateForm, BookToEdit } from "../../interfaces/book.interface";
import { setBooks, setCurrentBook } from "../../redux/slicers/bookSlice";
import { AppDispatch } from "../../redux/store/store";
import { fetchWithAuth } from "../interceptor";

export const fetchBookList = () => async (dispatch: AppDispatch) => {
	console.log("fetchBookList");
	try {
		const response = await fetchWithAuth(url + "Books", {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const booksList = await response.json();

			console.log(booksList);

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
				const lastAdded = await response.json();
				console.log("Aggiunto libro: ", lastAdded);
				console.log(lastAdded);
				dispatch(setCurrentBook(lastAdded));
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
				console.log("Modificato libro: ", booksList);
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
	(id: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(url + "Books/" + id, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const booksList = await response.json();
				console.log("Cancellato libro: ", booksList);
				dispatch(setBooks(booksList));
			} else {
				throw new Error("Errore nel recupero dei risultati");
			}
		} catch (error) {
			// Handle errors here, if necessary
			console.error("Errore nel fetch:", error);
		}
	};
