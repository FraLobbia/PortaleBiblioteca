import { Container } from "react-bootstrap";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { useEffect } from "react";
import { fetchLoansByUserId } from "../../api/loans/loansFetches";
import WriteReview from "../home/components/WriteReview";
import LoansOfUser from "./components/LoansOfUser";
import { Link } from "react-router-dom";

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
			<div className="alert-dark alert shadow">
				<div className="d-flex alert alert-dark shadow justify-content-around align-items-center">
					<h1 className="text-mattone-dark">
						Ciao, {user?.firstName}! <br />
						Ecco la tua area personale!
					</h1>
					<div className="d-flex flex-column align-items-center">
						<img
							className="img-thumbnail p-0"
							style={{
								width: "100px",
								objectFit: "cover",
								height: "100px",
							}}
							src={user?.userImage}
							alt="immagine profilo"
						/>
						<Link to="/user/edit" className="btn btn-primary mt-2">
							Modifica profilo
						</Link>
					</div>
				</div>
			</div>

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
