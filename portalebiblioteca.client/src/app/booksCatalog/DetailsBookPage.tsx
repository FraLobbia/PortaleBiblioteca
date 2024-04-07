import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import BackButton from "../_miscellaneous/reusable/BackButton";
import DetailsBook from "./components/DetailsBook";

const DetailsBookPage = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<Container>
			<BackButton />
			<h1>Dettagli libro</h1>
			{id && <DetailsBook idBook={id} />}
		</Container>
	);
};

export default DetailsBookPage;
