import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { fetchLoansByUserId } from "../../api/books/bookLOANSFetches";
import { Loan } from "../../interfaces/loans.interface";
import { formatData, howManyDaysAgo } from "../../functions/utility";
import { Container, Form } from "react-bootstrap";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { Link } from "react-router-dom";

const ElencoPrestiti = () => {
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	const [ShowAlsoReturned, setShowAlsoReturned] = useState<boolean>(false);
	const [barcodeScanChoice, setBarcodeScanChoice] = useState<boolean>(false);
	const [returnedBookLoanID, setReturnedBookLoanID] = useState<string>("");
	const [returnedBookISBN, setReturnedBookISBN] = useState<string>("");
	const { loansCurrentUser } = useAppSelector((state) => state.bookState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user) {
			dispatch(fetchLoansByUserId(user.idUser.toString()));
		}
	}, [user]);

	const activeLoans: Loan[] = (() => {
		const loans = loansCurrentUser.filter((loan: Loan) => !loan.returned);
		return loans;
	})();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let loanToReturn: Loan | undefined;

		if (barcodeScanChoice) {
			loanToReturn = activeLoans.find(
				(loan: Loan) => loan.book.isbn === returnedBookISBN
			);
		} else {
			loanToReturn = activeLoans.find(
				(loan: Loan) => loan.idLoan.toString() === returnedBookLoanID
			);
		}

		if (loanToReturn) {
			console.log(loanToReturn);
			// dispatch(returnLoan(loanToReturn.idLoan));
		}
	};

	return (
		<Container>
			<BackButton path="/catalogo" />
			<h2>Vuoi restituire un libro?</h2>
			<p>
				Se hai finito di leggere un libro, puoi restituirlo in questa
				sezione!
			</p>
			<Form onSubmit={handleSubmit}>
				{barcodeScanChoice ? (
					<Form.Group className="mt-3">
						<Form.Label>ISBN del libro da restituire</Form.Label>
						<Form.Control
							type="text"
							id="isbnField"
							onChange={(e) =>
								setReturnedBookISBN(e.target.value)
							}
							placeholder="Scansiona il barcode del libro"
						/>
					</Form.Group>
				) : (
					<Form.Group className="mt-3">
						<Form.Label>Titolo del libro da restituire</Form.Label>
						<Form.Select
							id="bookChoiceField"
							onChange={(e) =>
								setReturnedBookLoanID(e.target.value)
							}
							aria-label="Scelta del titolo da restituire">
							<option className="text-muted">
								Scegli un titolo tra i tuoi libri in prestito
							</option>
							{activeLoans.map((loan: Loan) => (
								<option key={loan.idLoan} value={loan.idLoan}>
									{loan.book.title} - {loan.book.author}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				)}
				<div className="d-flex gap-2 mt-2">
					<label
						htmlFor="barcodeNotFound"
						className="text-muted text-muted">
						Preferisci scansionare il barcode?
					</label>
					<input
						type="checkbox"
						id="barcodeNotFound"
						className="form-check-input"
						onChange={() =>
							setBarcodeScanChoice(!barcodeScanChoice)
						}
					/>
				</div>

				<Form.Group className="my-3">
					<Form.Control className="btn btn-success" type="submit" />
				</Form.Group>
			</Form>

			<hr />

			<h2>Elenco Prestiti</h2>
			<p>Qui puoi vedere i tuoi prestiti attivi</p>
			{loansCurrentUser.length > 0 ? (
				<>
					<h5 className=" text-muted">
						Al momento hai un totale di {activeLoans.length} libri
						in prestito
					</h5>
					<div className="d-flex gap-2">
						<label htmlFor="returned">
							Mostra anche i libri restituiti (
							{loansCurrentUser.length - activeLoans.length})
						</label>
						<input
							type="checkbox"
							className="form-check-input"
							id="returned"
							onChange={() =>
								setShowAlsoReturned(!ShowAlsoReturned)
							}
						/>
					</div>
					<table className="table table-light text-center">
						<thead>
							<tr>
								<th className="text-start">Titolo del libro</th>
								<th>Da quando?</th>
								{ShowAlsoReturned && (
									<>
										<th>Restituito?</th>
										<th>Data Restituzione</th>
									</>
								)}
							</tr>
						</thead>
						<tbody>
							{loansCurrentUser
								.filter((loan: Loan) =>
									ShowAlsoReturned ? true : !loan.returned
								)
								.map((loan: Loan) => (
									<tr key={loan.idLoan}>
										<td className="text-start">
											<Link
												to={
													"/catalogo/details/" +
													loan.book.idBook
												}>
												<img
													src={loan.book.coverImage}
													alt={loan.book.title}
													style={{
														width: "50px",
														height: "70px",
														objectFit: "cover",
													}}
												/>
												<p>{loan.book.title}</p>
											</Link>
											<p className="text-muted">
												{loan.book.author}
											</p>
										</td>
										<td>
											<p>
												{formatData(
													loan.loanDate.toString()
												)}
											</p>
											<hr className="m-0" />
											<p>
												{howManyDaysAgo(
													loan.loanDate.toString()
												)}{" "}
												giorni fa
											</p>
										</td>
										{ShowAlsoReturned && (
											<>
												{loan.returned ? (
													<td className="text-success">
														Sì
													</td>
												) : (
													<td className="text-danger">
														No
													</td>
												)}
												<td>
													{loan.returnDate &&
														formatData(
															loan.returnDate.toString()
														)}
												</td>
											</>
										)}
									</tr>
								))}
						</tbody>
					</table>
				</>
			) : (
				<p>Non hai prestiti attivi</p>
			)}
		</Container>
	);
};

export default ElencoPrestiti;
