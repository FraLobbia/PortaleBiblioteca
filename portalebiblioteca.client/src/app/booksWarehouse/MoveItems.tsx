import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { fetchBookById } from "../../api/booksCatalog/bookCRUDFetches";
import InventoryTable from "./components/InventoryTable";
import { getAisles } from "../../api/warehouse/AislesShelvesFetches";

const MoveItems = () => {
	// define hooks
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	// store variables
	const book = useAppSelector((state) => state.bookState.currentBook);

	// what appens when the component is mounted
	useEffect(() => {
		if (!id) return;
		dispatch(fetchBookById(id));
		dispatch(getAisles());
	}, []);
	return (
		<Container>
			<h1>Sposta libri dal magazzino</h1>
			<InventoryTable book={book} />
		</Container>
	);
};

export default MoveItems;
