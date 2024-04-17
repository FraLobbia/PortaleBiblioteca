import { Button, Container, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { formatData } from "../../Functions/utility";
import {
	fetchLoanByBookId,
	flagLoanAsReturned,
} from "../../api/loans/loansFetches";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const BookLoans = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// variables
	const { id } = useParams<{ id: string }>();

	// store variables
	const { loansOfBook } = useAppSelector((state) => state.loanState);

	// what appens when the component is mounted:
	// fetch the loans of the book
	useEffect(() => {
		if (!id) return;
		dispatch(fetchLoanByBookId(id));
	}, []);

	// function to return a book
	const returnBook = (idLoan: string) => {
		if (!id) return;
		Swal.fire({
			title: "Sei sicuro?",
			text: "Il libro verrà contrassegnato come restituito",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sì, restituisci!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(flagLoanAsReturned(idLoan)).then(() => {
					dispatch(fetchLoanByBookId(id));
				});
			}
		});
	};

	return (
		<Container>
			{loansOfBook.length === 0 ? (
				<p className="my-3">
					Il libro non ha prestiti attivi al momento
				</p>
			) : (
				<>
					<p className="my-3">
						Il libro ha un totale di{" "}
						<span className="fw-bold fs-5">
							{loansOfBook.length}{" "}
						</span>
						prestiti attivi
					</p>
					<Table striped bordered hover className="text-center">
						<thead>
							<tr>
								<th>Data</th>
								<th>Utente</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{loansOfBook.map((loan) => (
								<tr key={loan.idLoan}>
									<td>{formatData(loan.loanDate)}</td>
									<td>
										<div className="d-flex gap-2 justify-content-center">
											<img
												src={loan.user.userImage}
												height={"30px"}
												style={{ borderRadius: "50%" }}
												alt="immagine utente"
											/>
											{loan.user?.firstName}{" "}
											{loan.user?.lastName}
										</div>
									</td>
									<td>
										<Button
											variant="primary"
											onClick={() =>
												returnBook(
													loan.idLoan.toString()
												)
											}>
											Restituisci
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</Container>
	);
};

export default BookLoans;
