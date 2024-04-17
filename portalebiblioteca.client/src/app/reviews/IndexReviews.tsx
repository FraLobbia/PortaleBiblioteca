import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { useEffect } from "react";
import { fetchReviewList } from "../../api/reviews/reviewsCRUDfetches";
import { Review } from "../../interfaces/review.interface";
import BackButton from "../_miscellaneous/reusable/BackButton";
import SingleReview from "./components/SingleReview";

const IndexReviews = () => {
	// define hooks
	const dispatch = useAppDispatch();

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

			{reviews.map((review: Review) => (
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
