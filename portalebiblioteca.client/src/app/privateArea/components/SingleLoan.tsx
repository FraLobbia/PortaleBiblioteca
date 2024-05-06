import { Card, Col, Container, Row } from "react-bootstrap";
import { Loan } from "../../../interfaces/loans.interface";
import { ItemsEntityStatus } from "../../../interfaces/warehouse.interface";
import { Link } from "react-router-dom";
import { formatData } from "../../../Functions/utility";

type SingleLoanProps = {
	loan: Loan;
};

type abc = {
	width: string;
};

const SingleLoan = ({ loan }: SingleLoanProps) => {
	// function to set the percentage of the progress bar
	const setPercent = (loan: Loan): abc => {
		switch (loan.item?.status) {
			case ItemsEntityStatus.CheckedOutForLoan:
				return { width: "100%" };
			case ItemsEntityStatus.ReservedToBePicked:
				return { width: "60%" };
			case ItemsEntityStatus.AtLibrarianDesk:
				return { width: "100%" };
			default:
				return { width: "100%" };
		}
	};

	const colorProgressBar = (loan: Loan): string => {
		switch (loan.item?.status) {
			case ItemsEntityStatus.CheckedOutForLoan:
				return " bg-mattone";
			case ItemsEntityStatus.ReservedToBePicked:
				return " bg-mattone-light";
			case ItemsEntityStatus.AtLibrarianDesk:
				return " bg-success";
			default:
				return " bg-warning";
		}
	};

	const messageStatus = (loan: Loan): JSX.Element => {
		switch (loan.item?.status) {
			case ItemsEntityStatus.CheckedOutForLoan:
				return (
					<>
						<span className="text-start">
							Ce l'hai tu!
							<br />
							Ricorda di restituirlo al desk!
						</span>
					</>
				);
			case ItemsEntityStatus.ReservedToBePicked:
				return (
					<span className="text-center ms-5">
						In arrivo dal giorno successivo la richiesta!
					</span>
				);
			case ItemsEntityStatus.AtLibrarianDesk:
				return (
					<span className="align-self-end">
						Passa a ritirarlo al desk!
					</span>
				);
			default:
				return (
					<span className="text-end">
						{loan.returnDate && formatData(loan.returnDate)}
					</span>
				);
		}
	};

	const prova = setPercent(loan);
	return (
		<Card className="my-2 p-2 shadow alert border">
			<Card.Body>
				<Container fluid>
					<Row className="align-items-center">
						<Col xs={4} className="gap-2 text-center">
							<Link to={"/catalogo/details/" + loan.item?.idBook}>
								<img
									className="img-thumbnail p-0"
									src={loan.book.coverImage}
									alt="immagine libro prenotato"
									width={100}
								/>
							</Link>
						</Col>

						<Col xs={8} className="d-flex flex-column gap-3">
							<div>
								<h5>{loan.book.title}</h5>
								<p className="mt-2">{loan.book.author.name}</p>
							</div>
							<div>
								<div className="progress p-0">
									<div
										className={
											"progress-bar progress-bar-striped" +
											colorProgressBar(loan)
										}
										role="progressbar"
										aria-valuenow={75}
										aria-valuemin={0}
										aria-valuemax={100}
										style={prova}></div>
								</div>
								<div className="d-flex flex-column">
									{messageStatus(loan)}
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</Card.Body>
		</Card>
	);
};

export default SingleLoan;
