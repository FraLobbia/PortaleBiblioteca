import ReviewForm from "./ReviewForm";
import { Book } from "../../../interfaces/book.interface";
import { useAppDispatch, useAppSelector } from "../../../Functions/hooks";
import { Review } from "../../../interfaces/review.interface";
import { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
import { fetchReviewListByBookId } from "../../../api/reviews/reviewsCRUDfetches";
interface NewReviewProps {
	book: Book;
}

const NewReview = ({ book }: NewReviewProps) => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	const { bookReviews } = useAppSelector((state) => state.reviewState);

	// variables
	const [review, setReview] = useState<Review | null>(null);

	const reviewAlreadyWritten: Review | undefined = bookReviews?.find(
		(review: Review) => review.user.idUser === user?.idUser
	);

	// what happens when the component mounts:
	useEffect(() => {
		dispatch(fetchReviewListByBookId(book.idBook));
	}, []);

	// set the review object if the user has already written a review
	// review will be passed to the SingleReview component
	useEffect(() => {
		if (reviewAlreadyWritten) {
			setReview(reviewAlreadyWritten);
		}
	}, [bookReviews]);

	return (
		<>
			{reviewAlreadyWritten?.idBook === book.idBook ? (
				<>
					<div className="alert alert-secondary ">
						<h3>Ecco la tua recensione</h3>
						{review && <SingleReview review={review} user={user} />}
					</div>
				</>
			) : (
				<div className="alert border-mattone shadow">
					<ReviewForm idBook={book.idBook} />
				</div>
			)}
		</>
	);
};

export default NewReview;
