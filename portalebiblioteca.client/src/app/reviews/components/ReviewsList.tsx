import { Form } from "react-bootstrap";
import { Review } from "../../../interfaces/review.interface";
import SingleReview from "./SingleReview";
import { useState } from "react";

type ReviewsListProps = {
	reviews: Review[];
	searchHidden?: boolean;
};

const ReviewsList = ({ reviews, searchHidden }: ReviewsListProps) => {
	// variables
	const [search, setSearch] = useState<string>("");

	return (
		<>
			<Form className={`my-3 ${!searchHidden ? " d-none " : ""}`}>
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Cerca per titolo, testo o autore"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Form.Group>
			</Form>

			{reviews
				.filter(
					(review: Review) =>
						review.book?.title
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						review.reviewTitle
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						review.reviewBody
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						review.book?.author.name
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						review.user?.firstName
							.toLowerCase()
							.includes(search.toLowerCase())
				)
				.map((review: Review) => (
					<SingleReview
						key={"review-" + review.idReview}
						review={review}
						user={review.user}
					/>
				))}
		</>
	);
};

export default ReviewsList;
