import { Container } from "react-bootstrap";
import ReviewForm from "./components/ReviewForm";

const NewReview = () => {
	return (
		<Container>
			<h1>Scrivi una nuova recensione</h1>
			<div className="border">
				<ReviewForm />
			</div>
		</Container>
	);
};

export default NewReview;
