import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
	const navigate = useNavigate();
	return (
		<Button
			variant="outline-secondary"
			onClick={() => navigate(-1)}
			className="my-3 d-flex align-items-center">
			<FontAwesomeIcon className="fs-5" icon={faCircleChevronLeft} />{" "}
			<span className="px-3">Indietro</span>
		</Button>
	);
};

export default BackButton;
