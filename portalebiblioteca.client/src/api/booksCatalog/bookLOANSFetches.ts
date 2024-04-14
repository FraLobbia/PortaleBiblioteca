import Swal from "sweetalert2";
import { url } from "../../functions/config";
import { Loan, loanObjForm } from "../../interfaces/loans.interface";
import { setLoansOfUser } from "../../redux/slicers/bookSlice";
import { AppDispatch } from "../../redux/store/store";
import { fetchWithAuth } from "../interceptor";

export const addLoanToUser =
	(loanObj: loanObjForm) => async (dispatch: AppDispatch) => {
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
				const UpdatedLoanList: Loan[] = await response.json();
				dispatch(setLoansOfUser(UpdatedLoanList));
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
				console.info("Prestiti dell'utente loggato: ", loggedUserLoans);
				dispatch(setLoansOfUser(loggedUserLoans));
			} else {
				throw new Error("Errore nel recupero dei risultati");
			}
		} catch (error) {
			// Handle errors here, if necessary
			console.error("Errore nel fetch:", error);
		}
	};

export const flagLoanAsReturned =
	(idLoan: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(
				url + "api/Loans/return/" + idLoan,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				const UpdatedLoanList: Loan[] = await response.json();
				console.info(
					"Lista aggiornata con libro restituito: ",
					UpdatedLoanList
				);
				dispatch(setLoansOfUser(UpdatedLoanList));
				Swal.fire({
					title: "Libro restituito con successo!",
					icon: "success",
					timer: 1500,
				});
			} else {
				throw new Error("Errore nel recupero dei risultati");
			}
		} catch (error) {
			// Handle errors here, if necessary
			console.error("Errore nel fetch:", error);
		}
	};