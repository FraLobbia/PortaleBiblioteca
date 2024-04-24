import {
	faBook,
	faCompass,
	faFeather,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import NextArrow from "../_miscellaneous/reusable/NextArrow";
import PrevArrow from "../_miscellaneous/reusable/PrevArrow";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { fetchBookList } from "../../api/booksCatalog/bookCRUDFetches";
import { Loan } from "../../interfaces/loans.interface";
import { fetchLoansByUserId } from "../../api/loans/loansFetches";
import NewReview from "../reviews/components/NewReview";
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

	const settingsSlider = {
		dots: false,
		infinite: true,
		autoplay: true,
		speed: 500,
		slidesToShow: 12,
		adaptiveHeight: true, // to avoid clone
		slidesToScroll: 4,
		nextArrow: <NextArrow opacity="1" />,
		prevArrow: <PrevArrow opacity="1" />,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 12,
					slidesToScroll: 4,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 9,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
				},
			},
		],
	};
	const settingsSliderLoans = {
		dots: false,
		infinite: true,
		speed: 500,
		adaptiveHeight: true, // to avoid clone
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <NextArrow opacity="1" />,
		prevArrow: <PrevArrow opacity="1" />,
	};

	// what happens at mount
	useEffect(() => {
		dispatch(fetchBookList());
		if (!user) return;
		dispatch(fetchLoansByUserId(user.idUser));
	}, [user]);

	return (
		<div className="home-page container">
			<header>
				<h1 className="text-center display-2 mb-0">
					Benvenuti nella Biblioteca del <br /> Castello di Quinto
				</h1>
			</header>
			<main className="row">
				<Col md={6}>
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/f/f5/CASTELLO_degli_Avogadro_Quinto_Vercellese.jpg"
						alt="Biblioteca"
						className="mx-auto img-thumbnail border-0 d-block"
					/>
				</Col>
				<Col md={6}>
					<section className="collections">
						<h2 className="mt-4 text-end">Le nostre collezioni</h2>
						<p className="pb-1 text-end">
							Esplora le nostre collezioni di libri, suddivise per
							genere e autore. <br /> Oppure leggi le recensioni
							dei nostri utenti.
						</p>
						<div className="d-flex gap-2 flex-wrap justify-content-end">
							<Link
								to="/catalogo"
								className="btn btn-mattone shadow">
								<FontAwesomeIcon icon={faBook} />
								<span className="ms-2">Vai al catalogo</span>
							</Link>
							<Link
								to="/recensioni"
								className="btn btn-primary shadow">
								<FontAwesomeIcon icon={faFeather} />
								<span className="ms-2">
									Leggi le recensioni
								</span>
							</Link>
						</div>
					</section>

					<section>
						<h2 className="mt-4">I nostri servizi</h2>
						<p className="pb-1">
							Esplore le ricchezze della biblioteca: dal prestito
							dei libri alle recensioni più appassionanti. <br />{" "}
							Scopri un mondo di conoscenza e avventura
							letteraria!
						</p>
						<Link to="/features" className="btn btn-mattone shadow">
							<FontAwesomeIcon icon={faCompass} />
							<span className="ms-2">Che cosa puoi fare</span>
						</Link>
					</section>
				</Col>
			</main>

			<hr />

			<section id="potrebbe-interessarti">
				<h2>Potrebbe interessarti...</h2>
				<Slider className="my-3 px-5" {...settingsSlider}>
					{isLoading ? (
						<LoadingComponent />
					) : (
						books.map((book) => (
							<Link
								to={"/catalogo/details/" + book.idBook}
								key={"book-" + book.idBook}>
								<img
									src={book.coverImage}
									alt={book.title}
									className="img-thumbnail border-0"
								/>
							</Link>
						))
					)}
				</Slider>
			</section>

			<hr />

			<section id="lascia-una-recensione">
				<h2 className="text-end">
					...lasciare una recensione per un libro che hai letto di
					recente
				</h2>
				{loansCurrentUser.length ? (
					<>
						<Slider className="my-3" {...settingsSliderLoans}>
							{loansCurrentUser.map((loan: Loan) => (
								<div
									className="px-5 d-flex flex-column flex-md-row justify-content-around align-items-center gap-3"
									key={"loan-" + loan.book.idBook}>
									<Link
										to={
											"/catalogo/details/" +
											loan.book.idBook
										}>
										<img
											src={loan.book.coverImage}
											alt={loan.book.title}
											width={200}
											className="img-thumbnail border-0"
										/>
									</Link>
									<div className="flex-grow-1">
										<NewReview book={loan.book} />
									</div>
								</div>
							))}
						</Slider>
					</>
				) : user ? (
					<p>
						Non hai ancora effettuato prestiti. Vai al{" "}
						<Link to="/catalogo">catalogo</Link> e scegli il tuo
						prossimo libro!
					</p>
				) : null}
			</section>
		</div>
	);
};

export default HomePage;
