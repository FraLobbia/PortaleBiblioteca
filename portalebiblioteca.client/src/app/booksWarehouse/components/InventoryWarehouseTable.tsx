import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ItemsEntity } from "../../../interfaces/warehouse.interface";

interface InventoryTableProps {
	booksEntities: ItemsEntity[];
}

const InventoryWarehouseTable = ({ booksEntities }: InventoryTableProps) => {
	// variables

	return (
		<>
			<Table striped bordered hover>
				<thead className="container text-center">
					<tr className="row m-0">
						<th className="col-3">Magazzino</th>

						<th className="col-3">In magazzino</th>
						<th className="col-3">Disponibile sugli scaffali</th>
						<th className="col-3"></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{booksEntities
						.filter((item: ItemsEntity) =>
							item.shelf.shelfName.includes("Magazzino")
						)
						.map((item: ItemsEntity) => (
							<tr className="row m-0" key={item.idItemsEntity}>
								<td className="col-3 text-start">
									{item.shelf.shelfName}
								</td>

								<td className="col-3">{item.quantity}</td>
								<td className="col-3">
									{item.book.warehouseQuantity}
								</td>
								<td className="col-3">
									<Link
										to={"move/" + item.book?.idBook}
										className="btn btn-primary w-100 px-0">
										Sposta
									</Link>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</>
	);
};

export default InventoryWarehouseTable;
