import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ItemsEntity } from "../../../interfaces/warehouse.interface";
import { useAppDispatch, useAppSelector } from "../../../Functions/hooks";
import { setMoveSource } from "../../../Redux/slicers/warehouseSlice";

const InventoryTableNotPublic = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { bookEntities } = useAppSelector((state) => state.bookState);

	type GroupedItems = { [key: string]: ItemsEntity[] };
	const groupedItems: GroupedItems = bookEntities.reduce((acc, item) => {
		const shelfName = item.shelf.shelfName;
		if (!acc[shelfName]) {
			acc[shelfName] = [];
		}
		acc[shelfName].push(item);
		return acc;
	}, {} as GroupedItems);

	// Filtra solo gli scaffali del magazzino
	const warehouseShelves = Object.keys(groupedItems).filter((shelfName) =>
		shelfName.includes("Magazzino")
	);

	// Filtra solo gli scaffali virtuali per i prestiti
	const loansShelves = Object.keys(groupedItems).filter((shelfName) =>
		shelfName.includes("In prestito")
	);

	// Filtra solo gli scaffali del banco del bibliotecario
	const librarianDesk = Object.keys(groupedItems).filter((shelfName) =>
		shelfName.includes("bibliotecario")
	);

	return (
		<>
			<Table striped bordered hover>
				<thead className="container text-center">
					<tr className="row-cols-4 m-0">
						<th>Non disponibile al pubblico</th>

						<th>Quantità</th>
						<th></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{warehouseShelves.length <= 0 && (
						<tr>
							<td colSpan={4}>Nessun libro disponibile</td>
						</tr>
					)}
					{warehouseShelves
						.sort((a, b) => {
							const numberA = parseInt(a.replace(/^\D+/g, ""));
							const numberB = parseInt(b.replace(/^\D+/g, ""));
							return numberA - numberB;
						})
						.map((shelfName, index) => {
							const items = groupedItems[shelfName];
							const firstItem = items[0]; // Prendi solo il primo elemento per questo scaffale
							return (
								<tr key={index} className="row-cols-4 m-0">
									<td>{shelfName}</td>
									<td className="fs-3">
										{items.reduce(
											(acc, item) => acc + item.quantity,
											0
										)}
									</td>

									<td>
										<Link
											to={
												"/warehouse/move/" +
												firstItem?.book.idBook
											}>
											<Button
												onClick={() =>
													dispatch(
														setMoveSource([
															firstItem?.shelf
																.shelfName,
															firstItem.shelf
																.idShelf,
														])
													)
												}>
												Sposta
											</Button>
										</Link>
									</td>
								</tr>
							);
						})}

					{librarianDesk
						.sort((a, b) => {
							const numberA = parseInt(a.replace(/^\D+/g, ""));
							const numberB = parseInt(b.replace(/^\D+/g, ""));
							return numberA - numberB;
						})
						.map((shelfName, index) => {
							const items = groupedItems[shelfName];
							const firstItem = items[0]; // Prendi solo il primo elemento per questo scaffale
							return (
								<tr key={index} className="row-cols-4 m-0">
									<td>{shelfName}</td>
									<td className="fs-3">
										{items.reduce(
											(acc, item) => acc + item.quantity,
											0
										)}
									</td>

									<td>
										<Link
											to={
												"/warehouse/move/" +
												firstItem?.book.idBook
											}>
											<Button
												onClick={() =>
													dispatch(
														setMoveSource([
															firstItem?.shelf
																.shelfName,
															firstItem.shelf
																.idShelf,
														])
													)
												}>
												Sposta
											</Button>
										</Link>
									</td>
								</tr>
							);
						})}
					{loansShelves
						.sort((a, b) => {
							const numberA = parseInt(a.replace(/^\D+/g, ""));
							const numberB = parseInt(b.replace(/^\D+/g, ""));
							return numberA - numberB;
						})
						.map((shelfName, index) => {
							const items = groupedItems[shelfName];
							const firstItem = items[0]; // Prendi solo il primo elemento per questo scaffale
							return (
								<tr key={index} className="row-cols-4 m-0">
									<td>{shelfName}</td>
									<td className="fs-3">
										{items.reduce(
											(acc, item) => acc + item.quantity,
											0
										)}
									</td>

									<td>
										<Link
											to={
												"/warehouse/move/" +
												firstItem?.book.idBook
											}>
											<Button
												onClick={() =>
													dispatch(
														setMoveSource([
															firstItem?.shelf
																.shelfName,
															firstItem.shelf
																.idShelf,
														])
													)
												}>
												Sposta
											</Button>
										</Link>
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
		</>
	);
};

export default InventoryTableNotPublic;
