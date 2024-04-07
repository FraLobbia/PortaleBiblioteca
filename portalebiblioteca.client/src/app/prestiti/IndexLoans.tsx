import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { fetchLoansByUserId } from "../../api/booksCatalog/bookLOANSFetches";
import { Loan } from "../../interfaces/loans.interface";
import { Container } from "react-bootstrap";
import BackButton from "../_miscellaneous/reusable/BackButton";
import LoansHistory from "./components/LoansHistory";
import ReturnBookForm from "./components/ReturnBook";

const IndexLoans = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// define store variables
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	const { loansCurrentUser } = useAppSelector((state) => state.bookState);
	// separate active loans from the total loans
	const activeLoans: Loan[] = (() => {
		const loans = loansCurrentUser.filter((loan: Loan) => !loan.returned);
		return loans;
	})();

	// What happens when the component mounts
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

export default IndexLoans;
