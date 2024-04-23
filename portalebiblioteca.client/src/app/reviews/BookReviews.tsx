import { useParams } from "react-router-dom";
import NewReview from "./components/NewReview";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { useEffect } from "react";
import { fetchBookById } from "../../api/booksCatalog/bookCRUDFetches";
import { Accordion, Container } from "react-bootstrap";
import DetailsBook from "../booksCatalog/components/DetailsBook";
import BackButton from "../_miscellaneous/reusable/BackButton";
import ReviewsList from "./components/ReviewsList";
import { Link } from "react-router-dom";

const BookReviews = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// variables
	const { id } = useParams<{ id: string }>();

	// what happens when the component is rendered
	useEffect(() => {
		if (id) dispatch(fetchBookById(id));
	}, []);

	// store variables
	const { currentBook } = useAppSelector((state) => state.bookState);
	const { reviews, bookReviews } = useAppSelector(
		(state) => state.reviewState
	);

	return (
		<Container>
			<BackButton />
			<Link
				to={"/catalogo/details/" + currentBook?.idBook}
				className="text-decoration-none">
				<h1 className="alert-dark alert shadow">
					<div className="alert-dark alert border-5 border shadow">
						<div className="justify-content-center px-5 d-flex flex-column flex-sm-row align-items-center gap-3">
							<img
								className="mx-auto img-thumbnail border-0 d-block"
								src={currentBook?.coverImage}
								width={200}
								alt=""
							/>

							<div className="d-flex flex-column">
								<span>Recensioni </span>
								<span className="display-2">
									{currentBook?.title}
								</span>
								<span className="text-muted fs-3">
									di {currentBook?.author.name}
								</span>
							</div>
						</div>
					</div>
				</h1>
			</Link>
			{currentBook && (
				<>
					<NewReview book={currentBook} />

					<h2 className="mt-5 border-top border-4  pt-2">
						Recensioni di altri utenti
					</h2>
					<ReviewsList reviews={bookReviews} />

					<hr />

					<Accordion flush>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								Dettagli del libro
							</Accordion.Header>
							<Accordion.Body>
								<DetailsBook book={currentBook} />
							</Accordion.Body>
						</Accordion.Item>

						<Accordion.Item eventKey="1">
							<Accordion.Header>
								Recensioni di altri libri
							</Accordion.Header>
							<Accordion.Body>
								<ReviewsList reviews={reviews} />
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</>
			)}
		</Container>
	);
};

export default BookReviews;
