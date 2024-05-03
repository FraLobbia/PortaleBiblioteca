import {
	faArrowsLeftRight,
	faArrowsUpDown,
	faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";

const LegendaCorsie = () => {
	return (
		<Card className="mb-3">
			<Card.Body>
				<Card.Title>Legenda degli scaffali</Card.Title>
				<Card.Text className="text-start">
					<ul>
						<li>
							<FontAwesomeIcon icon={faRoad} />
							<span className="ms-2">
								Ci sono <strong>10</strong> corsie
							</span>
						</li>
						<li>
							<FontAwesomeIcon icon={faArrowsLeftRight} />
							<span className="ms-2">
								Ogni corsia è lunga <strong>100</strong> baie
							</span>
						</li>
						<li>
							<FontAwesomeIcon icon={faArrowsUpDown} />
							<span className="ms-2">
								Ogni baia ha <strong>5 </strong>
								livelli di altezza che corrispondono alle
								lettere dell'alfabeto partendo dal basso
							</span>
						</li>
					</ul>
					<p className="text-muted">
						Al momento ci sono 5000 posti per riporre i libri, la
						struttura è pensata e predisposta per essere espansa al
						bisogno.
					</p>
				</Card.Text>
				<img
					src="https://i.imgflip.com/8o3sig.jpg"
					className="img-thumbnail p-0"
					alt="legenda biblioteca"
				/>
			</Card.Body>
		</Card>
	);
};

export default LegendaCorsie;
