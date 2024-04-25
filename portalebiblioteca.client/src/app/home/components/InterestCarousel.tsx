import Slider from "react-slick";
import NextArrow from "../../_miscellaneous/reusable/NextArrow";
import PrevArrow from "../../_miscellaneous/reusable/PrevArrow";
import { Book } from "../../../interfaces/book.interface";
import { Link } from "react-router-dom";

interface InterestCarouselProps {
	books: Book[];
}

const InterestCarousel = ({ books }: InterestCarouselProps) => {
	// slider settings
	const settingsSlider = {
		dots: false,
		infinite: true,
		autoplay: true,
		speed: 500,
		slidesToShow: 12,
		adaptiveHeight: true, // to avoid clone
		slidesToScroll: 4,
		nextArrow: <NextArrow opacity="1" />,
		prevArrow: <PrevArrow opacity="1" />,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 12,
					slidesToScroll: 4,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 9,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
				},
			},
		],
	};

	return (
		<section id="potrebbe-interessarti">
			<h2>Potrebbe interessarti...</h2>
			<Slider className="my-3 px-5" {...settingsSlider}>
				{books.map((book) => (
					<Link
						to={"/catalogo/details/" + book.idBook}
						key={"book-" + book.idBook}>
						<img
							src={book.coverImage}
							alt={book.title}
							className="img-thumbnail border-0"
						/>
					</Link>
				))}
			</Slider>
		</section>
	);
};

export default InterestCarousel;
