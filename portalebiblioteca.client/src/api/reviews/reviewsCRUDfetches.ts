import Swal from "sweetalert2";
import { url } from "../../functions/config";
import { Review } from "../../interfaces/review.interface";
import { fetchWithAuth } from "../interceptor";

export const createReviewFetch = async (review: Review) => {
	try {
		const response = await fetchWithAuth(url + "api/Reviews", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(review),
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
				title: "Recensione aggiunta!",
				text: "La tua recensione è stata postata!",
				icon: "success",
				timer: 1500,
			});
		}
	} catch (error) {
		console.error(error);
	}
};
