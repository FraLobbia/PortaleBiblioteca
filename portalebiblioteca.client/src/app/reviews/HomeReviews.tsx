import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { useEffect } from "react";
import { fetchReviewList } from "../../api/reviews/reviewsCRUDfetches";
import BackButton from "../_miscellaneous/reusable/BackButton";
import ReviewsList from "./components/ReviewsList";

const HomeReviews = () => {
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

			<ReviewsList searchHidden reviews={reviews} />
		</Container>
	);
};

export default HomeReviews;
