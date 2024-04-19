import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Functions/hooks";
import { flagLoanAsReturned } from "../../../api/loans/loansFetches";
import { Form } from "react-bootstrap";
import { Loan } from "../../../interfaces/loans.interface";
import Swal from "sweetalert2";

const ReturnUserLoanForm = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// variables
	const [barcodeScanChoice, setBarcodeScanChoice] = useState<boolean>(false);
	const [returnedBookLoanID, setReturnedBookLoanID] = useState<string>("");
	const [returnedBookISBN, setReturnedBookISBN] = useState<string>("");

	// store variables
	const { loansCurrentUser } = useAppSelector((state) => state.loanState);

	// filter active loans from the total loans of the user
	const activeLoans: Loan[] = loansCurrentUser.filter(
		(loan: Loan) => !loan?.returned
	);

	// function to handle the form submission
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// find the loan to return by loan ID || book ISBN
		const loanToReturn = activeLoans.find(
			(loan: Loan) =>
				loan.idLoan.toString() === returnedBookLoanID ||
				loan.book.isbn === returnedBookISBN
		);
		if (!loanToReturn) {
			Swal.fire({
				title: "Errore",
				text: "Non è stato trovato alcun prestito con questi dati",
				icon: "error",
			});
			return;
		}
		dispatch(flagLoanAsReturned(loanToReturn.idLoan));
	};

	return (
		<>
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
								<option
									key={"loan" + loan.idLoan}
									value={loan.idLoan}>
									{loan.book?.title} -{" "}
									{loan.book?.author.name}
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
		</>
	);
};

export default ReturnUserLoanForm;
