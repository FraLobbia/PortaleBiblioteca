import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { fetchLoansByUserId } from "../../api/loans/loansFetches";
import { Loan } from "../../interfaces/loans.interface";
import { Container } from "react-bootstrap";
import BackButton from "../_miscellaneous/reusable/BackButton";
import LoansHistory from "./components/LoansHistory";
import ReturnBookForm from "./components/ReturnBook";

const IndexAllLoans = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// define store variables
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	const { loansCurrentUser } = useAppSelector((state) => state.loanState);
	// separate active loans from the total loans
	const activeLoans: Loan[] = (() => {
		const loans = loansCurrentUser.filter((loan: Loan) => !loan.returned);
		return loans;
	})();

	// What happens when the component mounts:
	// fetch the loans of the user
	useEffect(() => {
		if (user) {
			dispatch(fetchLoansByUserId(user.idUser.toString()));
		}
	}, [user]);

	return (
		<Container>
			<BackButton />
			<ReturnBookForm activeLoans={activeLoans} />
			<hr />
			<LoansHistory
				activeLoans={activeLoans}
				loansCurrentUser={loansCurrentUser}
			/>
		</Container>
	);
};

export default IndexAllLoans;
