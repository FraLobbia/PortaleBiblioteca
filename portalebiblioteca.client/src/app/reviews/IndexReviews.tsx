import { Container, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { useEffect, useState } from "react";
import { fetchReviewList } from "../../api/reviews/reviewsCRUDfetches";
import { Review } from "../../interfaces/review.interface";
import BackButton from "../_miscellaneous/reusable/BackButton";
import SingleReview from "./components/SingleReview";

const IndexReviews = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// variables
	const [search, setSearch] = useState<string>("");

	// store variables
	const { reviews } = useAppSelector((state) => state.reviewState);

	// what happens when the component is rendered
	useEffect(() => {
		dispatch(fetchReviewList());
	}, []);
	return (
		<Container>
			<BackButton />

			<h1>Alcune delle nostre recensioni</h1>
			<Form className="my-3">
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Cerca per titolo, testo o autore"
						value={search}
						onSubmit={(e) => e.preventDefault()}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Form.Group>
			</Form>
			{reviews
				.filter(
					(review: Review) =>
						review.reviewTitle.includes(search) ||
						review.reviewBody.includes(search) ||
						review.user?.firstName.includes(search) ||
						review.user?.lastName.includes(search)
				)
				.map((review: Review) => (
					<SingleReview
						key={"review-" + review.idReview}
						review={review}
						user={review.user}
					/>
				))}
		</Container>
	);
};

export default IndexReviews;
