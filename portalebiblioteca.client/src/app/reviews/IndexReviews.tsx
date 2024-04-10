import { useEffect } from "react";

const IndexReviews = () => {
	// store variables

	useEffect(() => {
		fetchReviews();
	}, []);

	const fetchReviews = async () => {
		const response = await fetch("http://localhost:3001/reviews");
		const data = await response.json();
		setReviews(data);
	};

	return (
		<div>
			<h1>Reviews</h1>
		</div>
	);
};

export default IndexReviews;
