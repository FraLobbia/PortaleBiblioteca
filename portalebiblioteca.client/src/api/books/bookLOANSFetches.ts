import { url } from "../../functions/config";
import { Loan, loanObjForm } from "../../interfaces/loans.interface";
import { setLoansByUserID } from "../../redux/slicers/bookSlice";
import { AppDispatch } from "../../redux/store/store";
import { fetchWithAuth } from "../interceptor";

export const addLoanToUser = (loanObj: loanObjForm) => {
	return fetchWithAuth(url + "api/Loans/add", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(loanObj),
	});
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
