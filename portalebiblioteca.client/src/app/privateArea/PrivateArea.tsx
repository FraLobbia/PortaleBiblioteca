import { Container } from "react-bootstrap";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { useEffect } from "react";
import { fetchLoansByUserId } from "../../api/loans/loansFetches";
import WriteReview from "../home/components/WriteReview";
import LoansOfUser from "./components/LoansOfUser";

const PrivateArea = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { loansCurrentUser } = useAppSelector((state) => state.loanState);
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	// what happens at mount
	useEffect(() => {
		if (user) {
			dispatch(fetchLoansByUserId(user.idUser));
		}
	}, [user]);

	return (
		<Container>
			<BackButton />
			<h1 className="alert alert-secondary shadow">
				Ciao, {user?.firstName}! <br />
				Ecco la tua area personale!
			</h1>

			<section id="i-tuoi-prestiti">
				<h2 className="mt-4">
					Qui puoi vedere le tue prenotazioni in corso
				</h2>
				<LoansOfUser loansCurrentUser={loansCurrentUser} />
			</section>

			<hr />

			<section id="recensioni-area-personale">
				<h2>
					Siccome ti sono piaciuti,
					<br />
					potresti lasciare una recensione per i libri che hai letto
					di recente
				</h2>
				<WriteReview loansCurrentUser={loansCurrentUser} />
			</section>
		</Container>
	);
};

export default PrivateArea;
