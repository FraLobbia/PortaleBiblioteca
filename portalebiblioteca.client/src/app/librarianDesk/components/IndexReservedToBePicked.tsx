import { useEffect } from "react";
import { useAppDispatch } from "../../../functions/hooks";
import { fetchReservedToBePicked } from "../../../api/warehouse/warehouseFetches";

const IndexReservedToBePicked = () => {
	// define hooks
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchReservedToBePicked());
	}, []);

	return (
		<div>
			<h1>Reserved to be picked</h1>
			<table>
				<thead>
					<tr>
						<th>Book</th>
						<th>Reader</th>
						<th>Reservation date</th>
					</tr>
				</thead>
				<tbody>
					{/* {reservedToBePicked.map((reservedToBePicked) => (
						<tr key={reservedToBePicked.id}>
							<td>{reservedToBePicked.book.title}</td>
							<td>{reservedToBePicked.reader.name}</td>
							<td>{reservedToBePicked.reservationDate}</td>
						</tr>
					))} */}
				</tbody>
			</table>
		</div>
	);
};

export default IndexReservedToBePicked;
