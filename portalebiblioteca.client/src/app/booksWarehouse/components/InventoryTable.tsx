import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../functions/hooks";
import { ItemsEntity } from "../../../interfaces/warehouse.interface";
import WarehouseTable from "./WarehouseTable";

const InventoryTable = () => {
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
						<th className="col-4">Scaffale</th>

						<th className="col-4">Quantità</th>
						<th className="col-4">Disponibile sugli scaffali</th>
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
								<td className="col-4 text-start">
									{item.shelf.shelfName}
								</td>

								<td className="col-4">{item.quantity}</td>
								<td className="col-4">
									{item.book.warehouseQuantity}
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
