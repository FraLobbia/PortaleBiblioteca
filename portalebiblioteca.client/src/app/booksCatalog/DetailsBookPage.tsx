import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import BackButton from "../_miscellaneous/reusable/BackButton";
import DetailsBook from "./components/DetailsBook";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { fetchBookById } from "../../api/booksCatalog/bookCRUDFetches";
import { useEffect } from "react";

const DetailsBookPage = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// variables
	const { id } = useParams<{ id: string }>();

	// what appens when the component is mounted
	useEffect(() => {
		if (id) dispatch(fetchBookById(id));
	}, []);

	//store variables
	const book = useAppSelector((state) => state.bookState.currentBook);

	return (
		<Container>
			<BackButton />
			<h1 className="display-2 border-bottom border-2">{book?.title}</h1>
			{book && <DetailsBook book={book} />}
		</Container>
	);
};

export default DetailsBookPage;
