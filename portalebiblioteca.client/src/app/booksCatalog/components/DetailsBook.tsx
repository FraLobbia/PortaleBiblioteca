import { Button, Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../functions/hooks";
import { loanObjForm } from "../../../interfaces/loans.interface";
import { addLoanToUser } from "../../../api/loans/loansFetches";
import { Link, useNavigate } from "react-router-dom";
import { formatData } from "../../../functions/utility";
import { Book } from "../../../interfaces/book.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBookOpen,
	faFeather,
	faSliders,
} from "@fortawesome/free-solid-svg-icons";
interface DetailsBookProps {
	book: Book | null;
}

const DetailsBook = ({ book }: DetailsBookProps) => {
	// define hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	//store variables
	const { permissionsToEdit, user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	// variables
	const isWarehouse = window.location.href.includes("warehouse");

	// function to create a loan
	const createLoan = () => {
		if (!book || !user) return;
		const idBook = book.idBook;
		const idUser = user.idUser;
		const loanObJ: loanObjForm = {
			idBook: idBook.toString(),
			IdUser: idUser.toString(),
		};
		dispatch(addLoanToUser(loanObJ)).then(() => navigate("/prestiti"));
	};

	return (
		<>
			{book && (
				<Row className="justify-content-center">
					<Col xs={8} md={3}>
						<img
							className="img-fluid border border-dark rounded"
							style={{
								objectFit: "cover",
							}}
							src={book.coverImage}
							alt={book.title}
						/>
						<dt>In prestito:</dt>
						<dd>{book.checkedOutForLoanQuantity}</dd>
						<dt>Disponibile:</dt>
						<dd>{book.availableQuantity}</dd>
						{!isWarehouse ? (
							<div className="d-flex flex-column gap-3">
								<Button
									onClick={createLoan}
									variant="mattone"
									className="d-flex
										justify-content-center align-items-center gap-2">
									<FontAwesomeIcon icon={faBookOpen} />
									<span>Prendi in prestito</span>
								</Button>
								<Link
									className="btn btn-primary d-flex
										justify-content-center align-items-center gap-2"
									to={"/recensioni/" + book.idBook}>
									<FontAwesomeIcon icon={faFeather} />
									<span>Recensioni</span>
								</Link>
								{permissionsToEdit && (
									<Link
										to={"/catalogo/edit/" + book.idBook}
										className="btn btn-warning d-flex
										justify-content-center align-items-center gap-2">
										<FontAwesomeIcon icon={faSliders} />
										<span>Dashboard</span>
									</Link>
								)}
							</div>
						) : (
							<>
								<dt>In magazzino:</dt>
								<dd>{book.warehouseQuantity}</dd>
								<dt>Al banco del bibliotecario:</dt>
								<dd>{book.atLibrarianDeskPickedQuantity}</dd>
							</>
						)}
					</Col>
					<Col xs={9}>
						<dt>Autore:</dt>
						<dd>{book.author.name}</dd>
						<dt>Titolo:</dt>
						<dd>{book.title}</dd>
						<dt>Descrizione:</dt>
						<dd>{book.description}</dd>
						<dt>Genere:</dt>
						<dd>{book.idGenre}</dd>
						<dt>Data di pubblicazione:</dt>
						<dd>{formatData(book.publicationDate?.toString())}</dd>
						<dt>ISBN:</dt>
						<dd>{book.isbn}</dd>
					</Col>
				</Row>
			)}
		</>
	);
};

export default DetailsBook;
