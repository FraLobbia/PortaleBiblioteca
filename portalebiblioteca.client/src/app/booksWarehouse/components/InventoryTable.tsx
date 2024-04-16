import { Button, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../functions/hooks";
import { ItemsEntity } from "../../../interfaces/warehouse.interface";
import WarehouseTable from "./WarehouseTable";
import { setMoveSource } from "../../../redux/slicers/warehouseSlice";
import { useEffect } from "react";
import { fetchItemsEntityByBookId } from "../../../api/warehouse/warehouseFetches";

const InventoryTable = () => {
	// define hooks
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	// store variables
	const { bookEntities } = useAppSelector((state) => state.bookState);

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
	const publicShelves = Object.keys(groupedItems).filter(
		(shelfName) =>
			!shelfName.includes("Magazzino") &&
			!shelfName.includes("In prestito") &&
			!shelfName.includes("bibliotecario")
	);

	useEffect(() => {
		dispatch(fetchItemsEntityByBookId(id));
	}, [id]);

	return (
		<>
			<h3>Inventario</h3>

			<WarehouseTable />

			<h6>Scaffali aperti al pubblico</h6>
			<Table striped bordered hover>
				<thead className="container text-center">
					<tr className="row-cols-4 m-0">
						<th>Scaffale</th>
						<th>Quantità</th>
						<th></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{publicShelves.length <= 0 && (
						<tr>
							<td colSpan={3}>
								Nessun libro disponibile al pubblico
							</td>
						</tr>
					)}
					{publicShelves
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
												"/warehouse/move/" +
												firstItem.book.idBook
											}>
											<Button
												onClick={() =>
													dispatch(
														setMoveSource([
															firstItem.shelf
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

					{publicShelves.length > 0 && (
						<tr className="m-0">
							<td className="text-center" colSpan={3}>
								<Link to="/todo">Vedi altri</Link>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</>
	);
};

export default InventoryTable;
