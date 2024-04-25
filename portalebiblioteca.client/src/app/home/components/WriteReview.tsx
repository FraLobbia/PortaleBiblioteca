import Slider from "react-slick";
import { Loan } from "../../../interfaces/loans.interface";
import NextArrow from "../../_miscellaneous/reusable/NextArrow";
import PrevArrow from "../../_miscellaneous/reusable/PrevArrow";
import { Link } from "react-router-dom";
import NewReview from "../../reviews/components/NewReview";
import { useAppSelector } from "../../../Functions/hooks";

interface WriteReviewProps {
	loansCurrentUser: Loan[] | null;
}
const WriteReview = ({ loansCurrentUser }: WriteReviewProps) => {
	// store variables
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	// slider settings
	const settingsSlider = {
		dots: false,
		infinite: true,
		speed: 500,
		adaptiveHeight: true, // to avoid clone
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <NextArrow opacity="1" />,
		prevArrow: <PrevArrow opacity="1" />,
	};
	return (
		<>
			{user ? (
				<>
					{loansCurrentUser ? (
						<Slider className="my-3" {...settingsSlider}>
							{loansCurrentUser.map((loan: Loan) => (
								<div
									className="px-5 d-flex flex-column flex-md-row justify-content-around align-items-center gap-3"
									key={"loan-" + loan.book.idBook}>
									<Link
										to={
											"/catalogo/details/" +
											loan.book.idBook
										}>
										<img
											src={loan.book.coverImage}
											alt={loan.book.title}
											width={200}
											className="img-thumbnail border-0"
										/>
									</Link>
									<div className="flex-grow-1">
										<NewReview book={loan.book} />
									</div>
								</div>
							))}
						</Slider>
					) : (
						<p>
							Non hai ancora effettuato prestiti. Vai al{" "}
							<Link to="/catalogo">catalogo</Link> e scegli il tuo
							prossimo libro!
						</p>
					)}
				</>
			) : null}
		</>
	);
};

export default WriteReview;
