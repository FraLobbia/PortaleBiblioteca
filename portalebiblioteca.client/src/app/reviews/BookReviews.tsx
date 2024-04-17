import { useParams } from "react-router-dom";
import NewReview from "./components/NewReview";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { useEffect } from "react";
import { fetchBookById } from "../../api/booksCatalog/bookCRUDFetches";
import { Accordion, Container } from "react-bootstrap";
import DetailsBook from "../booksCatalog/components/DetailsBook";
import IndexReviews from "./IndexReviews";
import BackButton from "../_miscellaneous/reusable/BackButton";

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
	const book = useAppSelector((state) => state.bookState.currentBook);

	return (
		<Container>
			<BackButton />
			<h1>
				Recensioni
				<br />
				{book?.title}
			</h1>
			{book && (
				<>
					<NewReview book={book} />

					<hr />

					<Accordion flush>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								Dettagli del libro
							</Accordion.Header>
							<Accordion.Body>
								<DetailsBook book={book} />
							</Accordion.Body>
						</Accordion.Item>

						<Accordion.Item eventKey="1">
							<Accordion.Header>
								Altre recensioni
							</Accordion.Header>
							<Accordion.Body>
								<IndexReviews />
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</>
			)}
		</Container>
	);
};

export default BookReviews;
