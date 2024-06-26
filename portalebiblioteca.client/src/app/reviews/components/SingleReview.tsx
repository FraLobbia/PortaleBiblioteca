import { Card, Col, Container, Row } from "react-bootstrap";
import { formatData } from "../../../Functions/utility";
import { Link } from "react-router-dom";
import { Review } from "../../../interfaces/review.interface";
import userTemplateImage from "../../../assets/images/userTemplateImage.jpg";
import { User } from "../../../interfaces/profile.interface";
interface SingleReviewProps {
	review: Review;
	user: User | undefined | null;
}

const SingleReview = ({ review, user }: SingleReviewProps) => {
	return (
		<Card className="border-primary mb-3" key={"review-" + review.idReview}>
			<Card.Header className="bg-mattone-light">
				<div className="d-flex justify-content-between align-items-center">
					<p className="fw-bold">
						<span>
							<img
								src={
									user?.userImage
										? user?.userImage
										: userTemplateImage
								}
								style={{
									borderRadius: "50%",
									objectFit: "cover",
									marginTop: "-3px",
								}}
								width="30"
								height="30"
								className="d-inline-block align-top me-1"
								alt="immagine profilo utente"
							/>
							{user?.firstName}
						</span>
					</p>
					<p>{review.reviewDate && formatData(review.reviewDate)}</p>
				</div>
				<p>
					<Link
						className="text-mattone-dark"
						to={"/catalogo/details/" + review.book?.idBook}>
						{review.book?.title} - {review.book?.author.name}
					</Link>
				</p>
			</Card.Header>
			<Card.Body>
				<Container>
					<Row>
						<Col xs={12} sm={11}>
							<Card.Title>{review.reviewTitle}</Card.Title>
							<Card.Text>{review.reviewBody}</Card.Text>
						</Col>
						<Col sm={1} className="d-none d-sm-block">
							<Link
								to={"/catalogo/details/" + review.book?.idBook}>
								<img
									src={review.book?.coverImage}
									className="img-thumbnail border-0 shadow"
									style={{
										objectFit: "cover",
										width: "100px",
									}}
									alt="immagine libro"
								/>
							</Link>
						</Col>
					</Row>
				</Container>
			</Card.Body>
		</Card>
	);
};

export default SingleReview;
