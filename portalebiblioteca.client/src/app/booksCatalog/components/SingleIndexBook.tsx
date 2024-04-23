import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { truncateText } from "../../../Functions/utility";
import {
	faBookOpen,
	faFeather,
	faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../../Functions/hooks";
import { Book } from "../../../interfaces/book.interface";

const SingelIndexBook = ({ book }: { book: Book }) => {
	// store variables
	const { permissionsToEdit } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	return (
		<Card id="indexBook--card" className="flex-lg-row align-items-center">
			<Link to={"details/" + book.idBook}>
				<Card.Img
					id="indexBook--card--img"
					style={{
						height: "300px",
						width: "200px",
						objectFit: "cover",
					}}
					src={
						book.coverImage?.length > 0
							? book.coverImage
							: "https://unsplash.it/640/425"
					}
				/>
			</Link>
			<Card.Body className="d-flex flex-column justify-content-between">
				<Card.Title>{book.title}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					{book.author.name}
				</Card.Subtitle>
				<Card.Text>{truncateText(book.description, 300)}</Card.Text>
				<div className="d-flex flex-column flex-sm-row gap-3 justify-content-end mt-3">
					{permissionsToEdit && (
						<Link
							className="btn btn-warning d-flex align-items-center gap-2"
							to={"edit/" + book.idBook}>
							<FontAwesomeIcon icon={faSliders} />
							<span>Dashboard</span>
						</Link>
					)}
					<Link
						className="btn btn-primary d-flex align-items-center gap-2"
						to={"/recensioni/" + book.idBook}>
						<FontAwesomeIcon icon={faFeather} />
						<span>Recensioni</span>
					</Link>
					<Link
						className="btn btn-mattone d-flex align-items-center gap-2"
						to={"details/" + book.idBook}>
						<FontAwesomeIcon icon={faBookOpen} />
						<span>Vedi dettagli e prendi in prestito!</span>
					</Link>
				</div>
			</Card.Body>
		</Card>
	);
};
export default SingelIndexBook;
