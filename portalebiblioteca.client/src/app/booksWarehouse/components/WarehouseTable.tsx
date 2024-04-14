import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ItemsEntity } from "../../../interfaces/warehouse.interface";

interface InventoryTableProps {
	bookEntities: ItemsEntity[];
}

const WarehouseTable = ({ bookEntities }: InventoryTableProps) => {
	// define hooks

	// variables
	const warehousequantity = bookEntities
		.filter((item: ItemsEntity) =>
			item.shelf.shelfName.includes("Magazzino")
		)
		.reduce((acc: number, item: ItemsEntity) => acc + item.quantity, 0);

	const totalQuantity =
		bookEntities.reduce(
			(acc: number, item: ItemsEntity) => acc + item.quantity,
			0
		) - warehousequantity;

	return (
		<>
			<Table striped bordered hover>
				<thead className="container text-center">
					<tr className="row m-0">
						<th className="col-3">Magazzino</th>

						<th className="col-3">Disponibile sugli scaffali</th>
						<th className="col-3">In magazzino</th>
						<th className="col-3"></th>
					</tr>
				</thead>
				<tbody className="text-center">
					<tr className="row m-0">
						<td className="col-3 text-start">
							{bookEntities[0]?.shelf.shelfName}
						</td>

						<td className="col-3">{totalQuantity}</td>
						<td className="col-3">{warehousequantity}</td>
						<td className="col-3">
							<Link
								to={"move/" + bookEntities[0]?.book.idBook}
								className="btn btn-primary w-100 px-0">
								Sposta
							</Link>
						</td>
					</tr>
				</tbody>
			</Table>
		</>
	);
};

export default WarehouseTable;
