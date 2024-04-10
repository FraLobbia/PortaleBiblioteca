import { Container, Form } from "react-bootstrap";
import { useAppSelector } from "../../../functions/hooks";
import { Review } from "../../../interfaces/review.interface";
import { useState } from "react";
import { createReviewFetch } from "../../../api/reviews/reviewsCRUDfetches";

interface ReviewFormProps {
	idBook: string | undefined;
}

const ReviewForm = ({ idBook }: ReviewFormProps) => {
	// define hooks

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
			idBook: parseInt(idBook),
			idUser: user.idUser,
			reviewTitle,
			reviewBody,
		};
		createReviewFetch(newReview);
		setReviewTitle("");
		setReviewBody("");
	};
	return (
		<Container fluid className="border border-3 border-mattone">
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

				<div className="my-3">
					<button type="submit" className="btn btn-primary">
						Invia
					</button>
					<button type="reset" className="btn btn-secondary ms-2">
						Cancella
					</button>
				</div>
			</Form>
		</Container>
	);
};

export default ReviewForm;
