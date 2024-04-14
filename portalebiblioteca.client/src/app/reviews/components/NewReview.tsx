import ReviewForm from "./ReviewForm";
import { Book } from "../../../interfaces/book.interface";
import { useAppSelector } from "../../../functions/hooks";
import { Review } from "../../../interfaces/review.interface";

interface NewReviewProps {
	book: Book;
}

const NewReview = ({ book }: NewReviewProps) => {
	// store variables
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	// variables
	const userHasAlreadyWrittenReview = book.reviews?.some(
		(review: Review) => review.idUser === user?.idUser
	);

	return (
		<>
			{userHasAlreadyWrittenReview ? (
				<>
					{" "}
					<h1>Scrivi una nuova recensione</h1>
					<ReviewForm idBook={book.idBook} />
				</>
			) : (
				<h1>Hai già scritto una recensione per questo libro</h1>
			)}
		</>
	);
};

export default NewReview;
