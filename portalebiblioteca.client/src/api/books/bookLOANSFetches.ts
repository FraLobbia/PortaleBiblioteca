import Swal from "sweetalert2";
import { url } from "../../functions/config";
import { Loan, loanObjForm } from "../../interfaces/loans.interface";
import { setLoansByUserID } from "../../redux/slicers/bookSlice";
import { AppDispatch } from "../../redux/store/store";
import { fetchWithAuth } from "../interceptor";

export const addLoanToUser = (loanObj: loanObjForm) => async () => {
	try {
		const response = await fetchWithAuth(url + "api/Loans/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loanObj),
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
			//const booksList: Book[] = await response.json();
			Swal.fire({
				title: "Il libro verrà messo da parte!",
				text: "Passa alla reception per ritirare il libro!",
				icon: "success",
				timer: 1500,
			});
		}
	} catch (error) {
		console.error(error);
	}
};

export const getLoans = () => {
	return fetchWithAuth(url + "api/Loans", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const fetchLoansByUserId =
	(id: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(url + "api/Loans/user/" + id, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const loggedUserLoans: Loan[] = await response.json();
				console.log("Prestiti dell'utente loggato: ", loggedUserLoans);
				dispatch(setLoansByUserID(loggedUserLoans));
			} else {
				throw new Error("Errore nel recupero dei risultati");
			}
		} catch (error) {
			// Handle errors here, if necessary
			console.error("Errore nel fetch:", error);
		}
	};
