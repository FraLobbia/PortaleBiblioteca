import { useState } from "react";
import { Link } from "react-router-dom";
import { formatData, howManyDaysAgo } from "../../../Functions/utility";
import { useAppSelector } from "../../../Functions/hooks";
import { Loan } from "../../../interfaces/loans.interface";
import { Table } from "react-bootstrap";

const UserLoansHistory = () => {
	// state variables
	const [ShowAlsoReturned, setShowAlsoReturned] = useState<boolean>(false);

	// store variables
	const { loansCurrentUser } = useAppSelector((state) => state.loanState);

	const activeLoans: Loan[] = loansCurrentUser.filter(
		(loan: Loan) => !loan?.returned
	);

	return (
		<>
			<h2>Elenco Prestiti</h2>
			<h5>Qui puoi vedere i tuoi prestiti attivi</h5>
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
					<Table
						striped
						hover
						bordered
						responsive
						className="text-center">
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
							{(ShowAlsoReturned
								? loansCurrentUser
								: activeLoans
							).map((loan: Loan) => (
								<tr key={"loan-" + loan.idLoan}>
									<td className="text-start">
										<Link
											to={
												"/catalogo/details/" +
												loan?.book?.idBook
											}>
											<img
												src={loan.book?.coverImage}
												alt={loan.book?.title}
												style={{
													width: "50px",
													height: "70px",
													objectFit: "cover",
												}}
											/>
											<p>{loan.book?.title}</p>
										</Link>
										<p className="text-muted">
											{loan.book?.author.name}
										</p>
									</td>
									<td>
										<p>{formatData(loan?.loanDate)}</p>
										<hr className="m-0" />
										<p>{howManyDaysAgo(loan?.loanDate)}</p>
									</td>
									{ShowAlsoReturned && (
										<>
											{loan?.returned ? (
												<td className="text-success">
													Sì
												</td>
											) : (
												<td className="text-danger">
													No
												</td>
											)}
											<td>
												{loan?.returnDate ? (
													<>
														<p>
															{formatData(
																loan?.returnDate.toString()
															)}
														</p>
														<hr className="m-0" />
														<p>
															{howManyDaysAgo(
																loan?.returnDate.toString()
															)}
														</p>
													</>
												) : (
													""
												)}
											</td>
										</>
									)}
								</tr>
							))}
						</tbody>
					</Table>
				</>
			) : (
				<>
					<h6>Non hai prestiti attivi</h6>
					<p>
						Vuoi prendere qualche libro in prestito? Dai un occhio
						al nostro catalogo!
					</p>
					<Link to="/catalogo">Vai al catalogo</Link>
				</>
			)}
		</>
	);
};

export default UserLoansHistory;
