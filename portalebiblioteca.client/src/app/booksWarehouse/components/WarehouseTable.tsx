import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ItemsEntity } from "../../../interfaces/warehouse.interface";
import { useAppDispatch, useAppSelector } from "../../../functions/hooks";
import { setMoveSource } from "../../../redux/slicers/warehouseSlice";

const WarehouseTable = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { bookEntities } = useAppSelector((state) => state.bookState);

	// variables
	// const warehousequantity = bookEntities
	// 	.filter(
	// 		(item: ItemsEntity) =>
	// 			item.shelf.shelfName.includes("Magazzino") &&
	// 			item.status === "AtWarehouse"
	// 	)
	// 	.reduce((acc: number, item: ItemsEntity) => acc + item.quantity, 0);

	// const totalQuantity =
	// 	bookEntities.reduce(
	// 		(acc: number, item: ItemsEntity) => acc + item.quantity,
	// 		0
	// 	) - warehousequantity;

	// Raggruppa gli elementi in un oggetto in cui
	// la chiave è il nome dello scaffale
	// e il valore è un array di ItemsEntity
	type GroupedItems = { [key: string]: ItemsEntity[] };
	const groupedItems: GroupedItems = bookEntities.reduce((acc, item) => {
		const shelfName = item.shelf.shelfName;
		if (!acc[shelfName]) {
			acc[shelfName] = [];
		}
		acc[shelfName].push(item);
		return acc;
	}, {} as GroupedItems);

	// Filtra solo gli scaffali aperti al pubblico
	const warehouseShelves = Object.keys(groupedItems).filter((shelfName) =>
		shelfName.includes("Magazzino")
	);

	const loansShelves = Object.keys(groupedItems).filter((shelfName) =>
		shelfName.includes("In prestito")
	);

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
									<td>
										{items.reduce(
											(acc, item) => acc + item.quantity,
											0
										)}
									</td>

									<td>
										<Link
											to={
												"move/" + firstItem?.book.idBook
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
									<td>
										{items.reduce(
											(acc, item) => acc + item.quantity,
											0
										)}
									</td>

									<td>
										<Link
											to={
												"move/" + firstItem?.book.idBook
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
									<td>
										{items.reduce(
											(acc, item) => acc + item.quantity,
											0
										)}
									</td>

									<td>
										<Link
											to={
												"move/" + firstItem?.book.idBook
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

					{/* <tr className="row m-0">
						<td className="col-3 text-start">
							{bookEntities[0]?.shelf.shelfName}
						</td>

						<td className="col-3">{totalQuantity}</td>
						<td className="col-3">{warehousequantity}</td>
						<td className="col-3">
							<Link to={"move/" + bookEntities[0]?.book.idBook}>
								<Button
									onClick={() =>
										dispatch(
											setMoveSource([
												bookEntities[0]?.shelf
													.shelfName,
												bookEntities[0].shelf.idShelf,
											])
										)
									}>
									Sposta
								</Button>
							</Link>
						</td>
					</tr> */}
				</tbody>
			</Table>
		</>
	);
};

export default WarehouseTable;
