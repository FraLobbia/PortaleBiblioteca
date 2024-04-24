import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Features = () => {
	return (
		<Container className="mt-5">
			<h1 className="mb-3">Che cosa puoi fare in questo portale</h1>
			<Row>
				<Col>
					<Card className="mb-3">
						<Card.Body>
							<Link to={"/catalogo"}>
								<Card.Title>
									Visualizzazione del Catalogo
								</Card.Title>
							</Link>
							<Card.Text>
								Il portale permette agli utenti di visualizzare
								il catalogo completo della biblioteca,
								permettendo di cercare e filtrare i libri in
								base ai propri interessi.
							</Card.Text>
						</Card.Body>
					</Card>
					<Card className="mb-3">
						<Card.Body>
							<Link to={"/recensioni"}>
								<Card.Title>Scrivere recensioni</Card.Title>
							</Link>
							<Card.Text>
								Per ogni libro è possibile scrivere una
								recensione e visualizzare quelle degli altri
								utenti.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card className="mb-3">
						<Card.Body>
							<Link to={"/prestiti"}>
								<Card.Title>Prestito Libri</Card.Title>
							</Link>
							<Card.Text>
								Gli utenti hanno un area riservata in cui
								visualizzare i propri prestiti e restituirli.
								Attraverso il catalogo possono prendere in
								prestito i libri a seconda della loro
								disponibilità sulle corsie. <br />
								<span className="text-muted fst-italic">
									La quantità di libri in magazzino è
									considerata non disponibile finchè non
									vengono spostati sulle corsie pubbliche.
								</span>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card className="mb-3">
						<Card.Body>
							<Link to={"/librarian"}>
								<Card.Title>
									Gestione da Parte del Bibliotecario
								</Card.Title>
							</Link>
							<Card.Text>
								Il bibliotecario può:
								<ul>
									<li>
										Aggiungere, modificare e rimuovere libri
										dal catalogo
									</li>
									<li>
										Visualizzare il totale prestiti in corso
										o per libro o per utente
									</li>
									<li>
										Effettuare una ricezione dei libri in
										magazzino
									</li>
									<li>
										Gestire gli spostamenti di libri tra
										magazzino, corsie e banco del
										bibliotecario
									</li>
								</ul>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row>
				<h2>Punti chiave</h2>
				<Col>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title>
								Autenticazione con <strong>JWT</strong>
							</Card.Title>
							<Card.Text>
								La sicurezza è garantita attraverso
								l'autenticazione con JWT token. Ogni fetch al
								server contiene un token di autenticazione
								criptato lato server per verificare l'identità
								ed i permessi dell'utente.
							</Card.Text>
						</Card.Body>
					</Card>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title>
								Gestione della quantità{" "}
								<strong>disponibile</strong> dei libri
							</Card.Title>
							<Card.Text>
								<p>
									Per essere considerati disponibili i libri
									devono, in questo ordine:
								</p>
								<ol>
									<li>
										Essere <strong>registrati </strong>
										in catalogo con i propri dettagli.
									</li>
									<li>
										Essere <strong>ricevuti </strong>
										dall'apposita sezione.
										<span>
											<i>
												Per ricevuti si intende l'arrivo
												ed il check-in di nuovi libri in
												magazzino.
											</i>
										</span>
									</li>
									<li>
										Essere <strong>spostati</strong> sulle
										corsie pubbliche per essere disponibili
										ai prestiti.
									</li>
								</ol>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Features;
