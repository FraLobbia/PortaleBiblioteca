import { Card } from "react-bootstrap";

const WarehouseSection = () => {
	return (
		<Card className="mb-3">
			<Card.Body>
				<Card.Title>Inventario</Card.Title>
				<Card.Text>
					<p>
						L'inventario delle entità dei libri è diviso in 4
						sezioni principali:
					</p>
					<ul>
						<li>
							<strong>Magazzino</strong>: dove sono conservati i
							libri non disponibili
						</li>
						<li>
							<strong>Corsie</strong>: dove sono conservati i
							libri disponibili
						</li>
						<li>
							<strong>Banco del Bibliotecario</strong>: dove sono
							conservati i libri pronti per essere consegnati ai
							richiedenti
						</li>
						<li>
							<strong>In prestito</strong>: uno scaffale virtuale
							per gestire i libri in prestito fuori sede
						</li>
					</ul>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default WarehouseSection;
