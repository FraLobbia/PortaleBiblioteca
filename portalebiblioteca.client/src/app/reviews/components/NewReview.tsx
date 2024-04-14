import ReviewForm from "./ReviewForm";
import { Book } from "../../../interfaces/book.interface";
import { useAppSelector } from "../../../functions/hooks";
import { Review } from "../../../interfaces/review.interface";
import { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
interface NewReviewProps {
	book: Book;
}

const NewReview = ({ book }: NewReviewProps) => {
	// store variables
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	// variables
	const [review, setReview] = useState<Review | null>(null);

	const userReview = book.reviews?.find(
		(review: Review) => review.idUser === user?.idUser
	);

	useEffect(() => {
		if (userReview) {
			setReview({
				...userReview,
				book: book,
			});
		}
	}, [userReview, book]);

	return (
		<>
			{userReview ? (
				<>
					<h3>
						Hai già recensito questo libro, <br /> ecco la tua
						recensione!
					</h3>
					{review && <SingleReview review={review} user={user} />}
				</>
			) : (
				<ReviewForm idBook={book.idBook} />
			)}
		</>
	);
};

export default NewReview;
