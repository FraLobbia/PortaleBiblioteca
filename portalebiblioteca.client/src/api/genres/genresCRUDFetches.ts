import Swal from "sweetalert2";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../interceptor";
import { AppDispatch } from "../../redux/store/store";
import { Genre } from "../../interfaces/genre.interface";
import { setCurrentGenre, setGenres } from "../../redux/slicers/genreSlice";

export const createGenreFetch = async (genre: Genre) => {
	try {
		const response = await fetchWithAuth(url + "api/Genres/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(genre),
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

export const fetchGenres = () => async (dispatch: AppDispatch) => {
	try {
		const response = await fetchWithAuth(url + "api/Genres", {
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
			const genres: Genre[] = await response.json();
			console.log("Generi: ", genres);
			dispatch(setGenres(genres));
		}
	} catch (error) {
		console.error(error);
	}
};

export const editGenreFetch = async (genre: Genre) => {
	try {
		const response = await fetchWithAuth(
			url + "api/Genres/" + genre.idGenre,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(genre),
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

export const deleteGenreFetch = async (idGenre: number) => {
	try {
		const response = await fetchWithAuth(url + "api/Genres/" + idGenre, {
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
				title: "Genere eliminato!",
				text: "Il genere è stato eliminato correttamente!",
				icon: "success",
				timer: 1500,
			});
		}
	} catch (error) {
		console.error(error);
	}
};

export const fetchGenreById =
	(idGenre: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(
				url + "api/Genres/" + idGenre,
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
				const genre: Genre = await response.json();
				dispatch(setCurrentGenre(genre));
			}
		} catch (error) {
			console.error(error);
		}
	};
