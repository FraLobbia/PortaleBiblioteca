import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { fetchGenres } from "../../api/genres/genresCRUDFetches";

const IndexGenres = () => {
	const dispatch = useAppDispatch();
	const { genres } = useAppSelector((state) => state.genreState);

	useEffect(() => {
		dispatch(fetchGenres());
	}, []);
	return (
		<div>
			<h1>Genres</h1>
			<ul>
				{genres.map((genre) => (
					<li key={genre.idGenre}>{genre.name}</li>
				))}
			</ul>
		</div>
	);
};

export default IndexGenres;
