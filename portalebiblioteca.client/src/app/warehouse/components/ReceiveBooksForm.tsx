import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { fetchAddToWarehouse } from "../../../api/warehouse/warehouseFetches";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../../functions/hooks";
import { useNavigate, useParams } from "react-router-dom";

const ReceiveBooks = () => {
	// define hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	//variables
	const [quantity, setQuantity] = useState<number>(1);
	const { id } = useParams<{ id: string }>();

	// functions to handle the form
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!id) return;
		dispatch(fetchAddToWarehouse(quantity, parseInt(id))).then(() => {
			// change tab
			navigate(`/catalogo/edit/${id}?tab=Warehouse`);
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label className="alert alert-secondary p-1 w-100 text-center d-flex align-items-center gap-2 justify-content-center">
					<FontAwesomeIcon icon={faCircleInfo} />
					<span>
						I libri verranno aggiunti in
						<b> Magazzino Corsia 200 - A1</b>
					</span>
				</Form.Label>
				<Form.Control
					placeholder="Quantità"
					value={quantity}
					min={1}
					max={1000}
					className="text-center mx-auto fs-1"
					style={{ maxWidth: "200px", height: "100px" }}
					onChange={(e) => setQuantity(parseInt(e.target.value))}
					type="number"
				/>
			</Form.Group>
			<Form.Group className="d-flex justify-content-center">
				<Button
					variant="success"
					className="my-3 py-3 w-75 fs-3"
					type="submit">
					Aggiungi quantità in magazzino
				</Button>
			</Form.Group>
		</Form>
	);
};
export default ReceiveBooks;
