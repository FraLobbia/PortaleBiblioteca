import Swal from "sweetalert2";
import { url } from "../../Functions/config";
import { Loan, loanObjForm } from "../../interfaces/loans.interface";
import { AppDispatch } from "../../Redux/Store/store";
import { fetchWithAuth } from "../interceptor";
import { setLoansOfBook, setLoansOfUser } from "../../Redux/slicers/loanSlice";
import { setLoading } from "../../Redux/slicers/loadingSlice";

export const addLoanToUser =
	(loanObj: loanObjForm) => async (dispatch: AppDispatch) => {
		dispatch(setLoading(true));
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
		} finally {
			dispatch(setLoading(false));
		}
	};

export const fetchLoansByUserId =
	(id: number) => async (dispatch: AppDispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await fetchWithAuth(url + "api/Loans/user/" + id, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const loggedUserItemsLoaned: Loan[] = await response.json();
				console.info(
					"Prestiti dell'utente loggato: ",
					loggedUserItemsLoaned
				);
				dispatch(setLoansOfUser(loggedUserItemsLoaned));
			} else {
				throw new Error("Errore nel recupero dei risultati");
			}
		} catch (error) {
			// Handle errors here, if necessary
			console.error("Errore nel fetch:", error);
		} finally {
			dispatch(setLoading(false));
		}
	};

export const flagLoanAsReturned =
	(idLoan: number | string) => async (dispatch: AppDispatch) => {
		dispatch(setLoading(true));
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
		} finally {
			dispatch(setLoading(false));
		}
	};

export const fetchLoanByBookId =
	(idBook: string) => async (dispatch: AppDispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await fetchWithAuth(
				url + "api/Loans/book/" + idBook,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const loans: Loan[] = await response.json();
				console.info("Prestiti relativi al libro: ", loans);
				dispatch(setLoansOfBook(loans));
			} else {
				throw new Error("Errore nel recupero dei risultati");
			}
		} catch (error) {
			// Handle errors here, if necessary
			console.error("Errore nel fetch:", error);
		} finally {
			dispatch(setLoading(false));
		}
	};
