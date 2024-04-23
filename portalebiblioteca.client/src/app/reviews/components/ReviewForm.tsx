import { Card, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../Functions/hooks";
import { Review } from "../../../interfaces/review.interface";
import { useState } from "react";
import { createReviewFetch } from "../../../api/reviews/reviewsCRUDfetches";
import { useNavigate } from "react-router-dom";

interface ReviewFormProps {
	idBook: number | undefined;
}

const ReviewForm = ({ idBook }: ReviewFormProps) => {
	// define hooks
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// variables
	const [reviewTitle, setReviewTitle] = useState<string>("");
	const [reviewBody, setReviewBody] = useState<string>("");

	// store variables
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	// define functions
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;
		if (!idBook) return;
		const newReview: Review = {
			idBook: idBook,
			idUser: user.idUser,
			reviewTitle,
			reviewBody,
		};
		dispatch(createReviewFetch(newReview)).then(() => {
			navigate("/recensioni");
		});
	};
	return (
		<>
			<Card className="border-0 p-2">
				<h2>Scrivi una recensione</h2>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Titolo</Form.Label>
						<Form.Control
							type="text"
							placeholder="Inserisci il titolo della recensione"
							value={reviewTitle}
							onChange={(e) => setReviewTitle(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Recensione</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Inserisci la tua recensione"
							value={reviewBody}
							onChange={(e) => setReviewBody(e.target.value)}
						/>
					</Form.Group>

					<div className="my-3 text-end">
						<button type="reset" className="btn btn-secondary me-3">
							Cancella
						</button>
						<button type="submit" className="btn btn-primary">
							Posta recensione
						</button>
					</div>
				</Form>
			</Card>
		</>
	);
};

export default ReviewForm;
