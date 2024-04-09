import { Container } from "react-bootstrap";
import BackButton from "./reusable/BackButton";
import { Link } from "react-router-dom";

const NotFound_404 = () => {
	return (
		<Container>
			<BackButton />
			<h1 className="text-center mt-5">404 Not Found</h1>
			<p className="text-center">
				Oh no! La pagina che stai cercando è stata spostata nei meandri
				più oscuri del labirinto dei libri.
			</p>
			<hr />
			<div className="d-flex justify-content-center">
				<Link to={"/"} className="btn btn-mattone text-center">
					Torna alla home
				</Link>
			</div>
		</Container>
	);
};

export default NotFound_404;
