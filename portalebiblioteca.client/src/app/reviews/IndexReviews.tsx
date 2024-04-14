import { Card, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { useEffect } from "react";
import { fetchReviewList } from "../../api/reviews/reviewsCRUDfetches";
import { Review } from "../../interfaces/review.interface";
import { Link } from "react-router-dom";
import { formatData } from "../../functions/utility";
import userTemplateImage from "../../assets/images/userTemplateImage.jpg";

const IndexReviews = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { reviews } = useAppSelector((state) => state.reviewState);
	// what happens when the component is rendered
	useEffect(() => {
		dispatch(fetchReviewList());
	}, []);
	return (
		<Container>
			<h1>Alcune delle nostre recensioni</h1>
			{reviews.map((review: Review) => (
				<Card
					className="border-primary mb-3"
					key={"review-" + review.idReview}>
					<Card.Header>
						<div className="d-flex justify-content-between align-items-center">
							<p className=" fw-bold">
								<span>
									<img
										src={
											review.user?.userImage
												? review.user?.userImage
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
									{review.user?.firstName}
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
								{review.book?.title} -{" "}
								{review.book?.author.name}
							</Link>
						</p>
					</Card.Header>
					<Card.Body>
						<Card.Title>{review.reviewTitle}</Card.Title>
						<Card.Text>{review.reviewBody}</Card.Text>
					</Card.Body>
				</Card>
			))}
		</Container>
	);
};

export default IndexReviews;
