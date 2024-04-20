import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { fetchLoansByUserId } from "../../api/loans/loansFetches";
import { Container } from "react-bootstrap";
import BackButton from "../_miscellaneous/reusable/BackButton";
import LoansHistory from "./components/UserLoansHistory";
import ReturnUserLoanForm from "./components/ReturnUserLoanForm";

const UserLoansDashboard = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// define store variables
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	// What happens when the component mounts:
	// fetch the loans of the user
	useEffect(() => {
		if (user) {
			dispatch(fetchLoansByUserId(user.idUser));
		}
	}, [user]);

	return (
		<Container>
			<BackButton />
			<ReturnUserLoanForm />
			<hr />
			<LoansHistory />
		</Container>
	);
};

export default UserLoansDashboard;
