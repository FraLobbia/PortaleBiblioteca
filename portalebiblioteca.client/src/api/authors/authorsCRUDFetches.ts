import Swal from "sweetalert2";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../interceptor";
import { AppDispatch } from "../../redux/store/store";
import { Author } from "../../interfaces/book.interface";
import { setAuthors, setCurrentAuthor } from "../../redux/slicers/authorSlice";

export const createGenreFetch = async (Author: Author) => {
	try {
		const response = await fetchWithAuth(url + "api/authors/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Author),
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
				title: "Genere aggiunto!",
				text: "Il genere è stato aggiunto correttamente!",
				icon: "success",
				timer: 1500,
			});
		}
	} catch (error) {
		console.error(error);
	}
};

export const fetchAuthors = () => async (dispatch: AppDispatch) => {
	try {
		const response = await fetchWithAuth(url + "api/authors", {
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
			const authors: Author[] = await response.json();
			console.log("Generi: ", authors);
			dispatch(setAuthors(authors));
		}
	} catch (error) {
		console.error(error);
	}
};

export const editGenreFetch = async (Author: Author) => {
	try {
		const response = await fetchWithAuth(
			url + "api/authors/" + Author.idAuthor,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(Author),
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
			Swal.fire({
				title: "Genere modificato!",
				text: "Il genere è stato modificato correttamente!",
				icon: "success",
				timer: 1500,
			});
		}
	} catch (error) {
		console.error(error);
	}
};

export const deleteAuthorFetch = async (idAuthor: number) => {
	try {
		const response = await fetchWithAuth(url + "api/authors/" + idAuthor, {
			method: "DELETE",
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
			Swal.fire({
				title: "Autore eliminato!",
				text: "L'autore è stato eliminato correttamente!",
				icon: "success",
				timer: 1500,
			});
		}
	} catch (error) {
		console.error(error);
	}
};

export const fetchAuthorById =
	(idAuthor: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(
				url + "api/authors/" + idAuthor,
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
				const Author: Author = await response.json();
				dispatch(setCurrentAuthor(Author));
			}
		} catch (error) {
			console.error(error);
		}
	};
