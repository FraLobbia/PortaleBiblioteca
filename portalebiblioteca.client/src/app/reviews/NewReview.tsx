import { Accordion, Container } from "react-bootstrap";
import ReviewForm from "./components/ReviewForm";
import DetailsBook from "../booksCatalog/components/DetailsBook";
import { useParams } from "react-router-dom";

const NewReview = () => {
	// define hooks

	// variables
	const { id } = useParams<{ id: string }>();

	return (
		<Container>
			<h1>Scrivi una nuova recensione</h1>
			<ReviewForm idBook={id} />
			<hr />
			<Accordion flush>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Dettagli del libro</Accordion.Header>
					<Accordion.Body>
						<DetailsBook idBook={id} />
					</Accordion.Body>
				</Accordion.Item>

				<Accordion.Item eventKey="1">
					<Accordion.Header>Altre recensioni</Accordion.Header>
					<Accordion.Body>
						<IndexReviews />
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Container>
	);
};

export default NewReview;
