import { Table } from "react-bootstrap";
import { Book } from "../../../interfaces/book.interface";
import { Link } from "react-router-dom";
import InventoryWarehouseTable from "./InventoryWarehouseTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../functions/hooks";
import { fetchItemsEntityByBookId } from "../../../api/warehouse/warehouseFetches";
import { ItemsEntity } from "../../../interfaces/warehouse.interface";

interface InventoryTableProps {
	book: Book | null;
}

const InventoryTable = ({ book }: InventoryTableProps) => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { booksEntities } = useAppSelector((state) => state.bookState);
	// what happens when the component is rendered
	useEffect(() => {
		dispatch(fetchItemsEntityByBookId(book?.idBook || 0));
	}, []);

	return (
		<>
			<h3>Inventario</h3>
			<InventoryWarehouseTable booksEntities={booksEntities} />
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
					{booksEntities
						.filter((item: ItemsEntity) =>
							item.shelf.shelfName.includes("Corsia")
						)
						.map((item: ItemsEntity) => (
							<tr className="row m-0" key={item.idItemsEntity}>
								<td className="col-4 text-start">
									{item.shelf.shelfName}
								</td>

								<td>{item.quantity}</td>
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
