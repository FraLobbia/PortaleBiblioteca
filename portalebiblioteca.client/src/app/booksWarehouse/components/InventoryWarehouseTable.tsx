import { Table } from "react-bootstrap";
import { Book } from "../../../interfaces/book.interface";
import { Link } from "react-router-dom";

interface InventoryTableProps {
	book: Book | null;
}

const InventoryWarehouseTable = ({ book }: InventoryTableProps) => {
	// variables

	return (
		<>
			<h3>Inventario</h3>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Magazzino</th>
						<th>Titolo</th>
						<th>In magazzino</th>
						<th>Disponibile sugli scaffali</th>
						<th></th>
					</tr>
				</thead>
				<tbody
				// style={{ overflowY: "scroll", height: "300px" }}
				>
					<tr>
						<td>200-A1</td>
						<td>{book?.title}</td>
						<td>{book?.warehouseQuantity}</td>
						<td>{book?.availableQuantity}</td>

						<td>
							<Link
								to={"move/" + book?.idBook}
								className="btn btn-primary">
								Sposta
							</Link>
						</td>
					</tr>
				</tbody>
			</Table>
		</>
	);
};

export default InventoryWarehouseTable;
