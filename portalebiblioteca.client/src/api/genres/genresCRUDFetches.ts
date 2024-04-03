import Swal from "sweetalert2";
import { url } from "../../functions/config";
import { Genre } from "../../interfaces/book.interface";
import { fetchWithAuth } from "../interceptor";
import { AppDispatch } from "../../redux/store/store";
import { setGenres } from "../../redux/slicers/genreSlice";

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
