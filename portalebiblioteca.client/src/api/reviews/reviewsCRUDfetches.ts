import Swal from "sweetalert2";
import { url } from "../../Functions/config";
import { Review } from "../../interfaces/review.interface";
import { fetchWithAuth } from "../interceptor";
import { AppDispatch } from "../../Redux/Store/store";
import { setReviews } from "../../Redux/slicers/reviewSlice";
import { Toast } from "../../Functions/utility";

export const fetchReviewList = () => async (dispatch: AppDispatch) => {
	try {
		const response = await fetchWithAuth(url + "api/Reviews", {
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
			const reviewList: Review[] = await response.json();
			console.info("Lista delle review", reviewList);
			dispatch(setReviews(reviewList));
		}
	} catch (error) {
		// Handle errors here, if necessary
		console.error("Errore nel fetch:", error);
	}
};

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
