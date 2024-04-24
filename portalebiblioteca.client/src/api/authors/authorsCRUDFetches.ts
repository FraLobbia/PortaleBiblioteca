import Swal from "sweetalert2";
import { url } from "../../Functions/config";
import { fetchWithAuth } from "../interceptor";
import { AppDispatch } from "../../Redux/Store/store";
import { Author } from "../../interfaces/book.interface";
import { setAuthors, setCurrentAuthor } from "../../Redux/slicers/authorSlice";
import { setLoading } from "../../Redux/slicers/loadingSlice";

export const createAuthorFetch =
	(Author: Author) => async (dispatch: AppDispatch) => {
		dispatch(setLoading(true));
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
					title: "Autore aggiunto!",
					text: "L'autore è stato aggiunto correttamente!",
					icon: "success",
					timer: 1500,
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(setLoading(false));
		}
	};

export const fetchAuthors = () => async (dispatch: AppDispatch) => {
	dispatch(setLoading(true));
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
			dispatch(setAuthors(authors));
		}
	} catch (error) {
		console.error(error);
	} finally {
		dispatch(setLoading(false));
	}
};

export const editAuthorFetch =
	(Author: Author) => async (dispatch: AppDispatch) => {
		dispatch(setLoading(true));
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
					title: "Autore modificato!",
					text: "L'autore è stato modificato correttamente!",
					icon: "success",
					timer: 1500,
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(setLoading(false));
		}
	};

export const deleteAuthorFetch =
	(idAuthor: number) => async (dispatch: AppDispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await fetchWithAuth(
				url + "api/authors/" + idAuthor,
				{
					method: "DELETE",
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
				Swal.fire({
					title: "Autore eliminato!",
					text: "L'autore è stato eliminato correttamente!",
					icon: "success",
					timer: 1500,
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(setLoading(false));
		}
	};

export const fetchAuthorById =
	(idAuthor: number | string) => async (dispatch: AppDispatch) => {
		dispatch(setLoading(true));
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
		} finally {
			dispatch(setLoading(false));
		}
	};
