import { Card } from "react-bootstrap";
import { formatData } from "../../../functions/utility";
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
			<Card.Header>
				<div className="d-flex justify-content-between align-items-center">
					<p className=" fw-bold">
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
					<p className="text-muted">
						{formatData(review.reviewDate)}
					</p>
				</div>
				<p>
					<Link
						className="text-muted"
						to={"/catalogo/details/" + review.book?.idBook}>
						{review.book?.title} - {review.book?.author.name}
					</Link>
				</p>
			</Card.Header>
			<Card.Body>
				<Card.Title>{review.reviewTitle}</Card.Title>
				<Card.Text>{review.reviewBody}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default SingleReview;
