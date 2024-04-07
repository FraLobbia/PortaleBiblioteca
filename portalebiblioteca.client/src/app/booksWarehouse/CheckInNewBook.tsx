import { Button, Form } from "react-bootstrap";
import DetailsBook from "../booksCatalog/components/DetailsBook";
import { useState } from "react";
import { addToWarehouse } from "../../api/warehouse/warehouseFetches";

interface CheckInNewBookProps {
	idBook: string;
}

const CheckInNewBook = ({ idBook }: CheckInNewBookProps) => {
	// define hooks

	//variables
	const [quantity, setQuantity] = useState<number>(0);

	//functions
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!idBook) return;
		addToWarehouse(quantity, parseInt(idBook));
	};

	return (
		<>
			<h1 className="my-3">Aggiungi quantità in magazzino</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Quantità arrivata</Form.Label>
					<Form.Control
						onChange={(e) => setQuantity(parseInt(e.target.value))}
						type="number"
					/>
				</Form.Group>
				<Form.Group>
					<Button type="submit">Aggiungi</Button>
				</Form.Group>
			</Form>

			<hr />
			<h3 className="my-3 text-center">
				Controlla che i dati corrispondano al libro arrivato
			</h3>
			{idBook && <DetailsBook idBook={idBook} />}
		</>
	);
};
export default CheckInNewBook;
