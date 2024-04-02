import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { fetchLoansByUserId } from "../../api/books/bookLOANSFetches";
import { Loan } from "../../interfaces/loans.interface";
import { formatData } from "../../functions/utility";

const ElencoPrestiti = () => {
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	const { loansCurrentUser } = useAppSelector((state) => state.bookState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user) {
			dispatch(fetchLoansByUserId(user.idUser.toString()));
		}
	}, [user]);
	return (
		<div>
			<h1>Elenco Prestiti</h1>
			{loansCurrentUser.length > 0 ? (
				<table className="table table-info">
					<thead>
						<tr>
							<th>Titolo</th>
							<th>Data Inizio prestito</th>
							<th>Data Restituzione</th>
						</tr>
					</thead>
					<tbody>
						{loansCurrentUser.map((loan: Loan) => (
							<tr key={loan.idLoan}>
								<td>{loan.book.title}</td>
								<td>{formatData(loan.loanDate.toString())}</td>
								<td>
									{loan.returnDate &&
										formatData(loan.returnDate.toString())}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>Non hai prestiti attivi</p>
			)}
		</div>
	);
};

export default ElencoPrestiti;
