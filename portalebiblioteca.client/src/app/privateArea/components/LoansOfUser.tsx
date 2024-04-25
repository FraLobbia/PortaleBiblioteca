import { useState } from "react";
import { Loan } from "../../../interfaces/loans.interface";
import { ItemsEntityStatus } from "../../../interfaces/warehouse.interface";
import SingleLoan from "./SingleLoan";

interface WriteReviewProps {
	loansCurrentUser: Loan[] | null;
}

const LoansOfUser = ({ loansCurrentUser }: WriteReviewProps) => {
	// state variables
	const [ShowAlsoReturned, setShowAlsoReturned] = useState<boolean>(false);

	const activeLoans: Loan[] | undefined = loansCurrentUser?.filter(
		(loan: Loan) => !loan?.returned
	);
	return (
		<>
			{loansCurrentUser && activeLoans ? (
				<>
					<h5 className=" text-muted">
						Al momento hai un totale di {activeLoans.length}{" "}
						prestiti attivi
					</h5>
					<div className="d-flex gap-2 justify-content-end pe-4 my-3">
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
					{loansCurrentUser
						.filter(
							(loan: Loan) =>
								loan.item?.status ===
									ItemsEntityStatus.ReservedToBePicked ||
								loan.item?.status ===
									ItemsEntityStatus.AtLibrarianDesk ||
								loan.item?.status ===
									ItemsEntityStatus.CheckedOutForLoan ||
								(ShowAlsoReturned && loan.returned)
						)
						.map((loan: Loan) => (
							<SingleLoan key={loan.idLoan} loan={loan} />
						))}
				</>
			) : null}
		</>
	);
};
export default LoansOfUser;
