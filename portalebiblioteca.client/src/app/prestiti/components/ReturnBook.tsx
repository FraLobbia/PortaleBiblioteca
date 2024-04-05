import { useState } from "react";
import { useAppDispatch } from "../../../functions/hooks";
import { Loan } from "../../../interfaces/loans.interface";
import { flagLoanAsReturned } from "../../../api/books/bookLOANSFetches";
import { Form } from "react-bootstrap";

interface ReturnBookFormProps {
	activeLoans: Loan[];
}

const ReturnBookForm = ({ activeLoans }: ReturnBookFormProps) => {
	// define hooks
	const dispatch = useAppDispatch();

	// state variables
	const [barcodeScanChoice, setBarcodeScanChoice] = useState<boolean>(false);
	const [returnedBookLoanID, setReturnedBookLoanID] = useState<string>("");
	const [returnedBookISBN, setReturnedBookISBN] = useState<string>("");

	// function to handle the form submission
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
			dispatch(flagLoanAsReturned(loanToReturn.idLoan.toString()));
		}
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
		</>
	);
};

export default ReturnBookForm;
