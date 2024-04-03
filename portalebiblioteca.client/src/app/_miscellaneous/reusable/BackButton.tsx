import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
	const navigate = useNavigate();
	return (
		<Button onClick={() => navigate(-1)} className="btn btn-primary my-3">
			&lt;&lt; Indietro
		</Button>
	);
};

export default BackButton;
