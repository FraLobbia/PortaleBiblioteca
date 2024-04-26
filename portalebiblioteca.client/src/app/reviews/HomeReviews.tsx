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

			<div className="alert-dark alert shadow">
				<div className="alert-dark alert border-5 border shadow">
					<h1 className="m-3 text-mattone-dark">
						Alcune delle nostre recensioni
					</h1>
				</div>
			</div>
			<ReviewsList searchHidden reviews={reviews} />
		</Container>
	);
};

export default HomeReviews;
