import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../functions/hooks";
import { ItemsEntity } from "../../../interfaces/warehouse.interface";
import WarehouseTable from "./WarehouseTable";
import { setMoveSource } from "../../../redux/slicers/warehouseSlice";

const InventoryTable = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { bookEntities } = useAppSelector((state) => state.bookState);

	return (
		<>
			<h3>Inventario</h3>

			<WarehouseTable />

			<h6>Scaffali aperti al pubblico</h6>
			<Table striped bordered hover>
				<thead className="container text-center">
					<tr className="row m-0">
						<th className="col-3">Scaffale</th>

						<th className="col-3">Quantità</th>
						<th className="col-3">Disponibile sugli scaffali</th>
						<th className="col-3"></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{bookEntities
						.filter((item: ItemsEntity) =>
							item.shelf.shelfName.includes("Corsia")
						)
						.sort(
							(a: ItemsEntity, b: ItemsEntity) =>
								b.idItemsEntity - a.idItemsEntity
						)
						.map((item: ItemsEntity) => (
							<tr
								className="row m-0"
								key={"item-" + item.idItemsEntity}>
								<td className="col-3 text-start">
									{item.shelf.shelfName}
								</td>

								<td className="col-3">{item.quantity}</td>
								<td className="col-3">
									{item.book.warehouseQuantity}
								</td>
								<td className="col-3">
									<Link to={"move/" + item.book.idBook}>
										<Button
											onClick={() =>
												dispatch(
													setMoveSource([
														item.shelf.shelfName,
														item.shelf.idShelf,
													])
												)
											}>
											Sposta
										</Button>
									</Link>
								</td>
							</tr>
						))}

					<tr className="row m-0">
						<td className="col text-center" colSpan={4}>
							<Link to="/todo">Vedi altri</Link>
						</td>
					</tr>
				</tbody>
			</Table>
		</>
	);
};

export default InventoryTable;
