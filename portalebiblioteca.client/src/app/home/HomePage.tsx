import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { fetchBookList } from "../../api/booksCatalog/bookCRUDFetches";
import { fetchLoansByUserId } from "../../api/loans/loansFetches";
import HeroSection from "./components/HeroSection";
import InterestCarousel from "./components/InterestCarousel";
import WriteReview from "./components/WriteReview";
import LoadingComponent from "../_miscellaneous/reusable/LoadingComponent";

const HomePage = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variable
	const { books } = useAppSelector((state) => state.bookState);
	const { loansCurrentUser } = useAppSelector((state) => state.loanState);
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	const { isLoading } = useAppSelector((state) => state.loadingState);

	// what happens at mount
	useEffect(() => {
		dispatch(fetchBookList());
		if (!user) return;
		dispatch(fetchLoansByUserId(user.idUser));
	}, [user]);

	return (
		<div className="home-page container">
			<header>
				<h1 className="text-center display-2">
					Benvenuti nella Biblioteca del <br /> Castello di Quinto
				</h1>
				<HeroSection />
			</header>

			{!isLoading ? (
				<>
					<main>
						<hr />
						<InterestCarousel books={books} />
						<hr />

						<section id="lascia-una-recensione">
							<h2 className="text-end">
								...lasciare una recensione per un libro che hai
								letto di recente
							</h2>
							<WriteReview loansCurrentUser={loansCurrentUser} />
						</section>
					</main>
				</>
			) : (
				<LoadingComponent />
			)}
		</div>
	);
};

export default HomePage;
