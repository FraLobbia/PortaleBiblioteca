import { Container, Row, Col, Card } from "react-bootstrap";
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
									vengono spostati sulle corsie pubbliche dal
									bibliotecario.
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
			<hr />
			<Row>
				<h2>Punti chiave</h2>
				<Col>
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
					<Card className="mb-3">
						<Card.Body>
							<Card.Title>
								Gestione dei <strong>prestiti</strong>
							</Card.Title>
							<Card.Text>
								I prestiti passano attraverso 4 step:
								<ol>
									<li>
										Attraverso la consultazone del{" "}
										<strong>catalogo </strong>
										si possono prenotare i libri, se
										disponibili
									</li>
									<li>
										La prenotazione ricade su un libro nelle
										corsie, quindi il libro{" "}
										<strong>deve essere preso</strong> dal
										bibliotecario e portato al banco
										attraverso l'apposita funzione
									</li>
									<li>
										Una volta che il libro{" "}
										<strong> si trova al banco </strong>
										può essere consegnato al richiedente
									</li>
									<li>
										Quando il libro viene{" "}
										<strong>restituito</strong>, viene posto
										sul banco del bibliotecario in attesa di
										essere rimesso in corsia o in magazzino.
										Non avendo questo una prenotazione verrà
										diviso in una sezione del banco
										apposita.
									</li>
								</ol>
							</Card.Text>
						</Card.Body>
					</Card>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title>
								Gestione dell'<strong>inventario </strong>da
								parte del bibliotecario
							</Card.Title>
							<Card.Text>
								Per ogni libro è possibile visualizzare:
								<ul>
									<li>Quantità disponibile</li>
									<li>
										Quantità in magazzino{" "}
										<i>(non disponibile)</i>
									</li>
									<li>
										Quantità prenotata{" "}
										<i>
											(con riferimento dell'utente
											richiedente)
										</i>{" "}
									</li>
									<li>Quantità al banco del bibliotecario</li>
									<li>Quantità fuori sede per prestito</li>
								</ul>
								Questo viene gestito attribuendo un apposito{" "}
								<u>
									<strong>status</strong> all'entità di
									magazzino{" "}
								</u>
								che rappresenta il libro.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row>
				<h2>Dettagli tecnici</h2>
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
								Utilizzo di <strong>Redux</strong> e di{" "}
								<strong>TypeScript</strong>
							</Card.Title>
							<Card.Text>
								Lo scambio di informazioni tra i componenti è
								gestito attraverso Redux, permettendo di avere
								uno stato globale dell'applicazione mantenendo
								il codice pulito e facilmente manutenibile.
								L'utilizzo di TypeScript aggiunge ancora più
								robustezza e sicurezza in interventi posteriori
								con maggiore precisione.
							</Card.Text>
						</Card.Body>
					</Card>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title>
								Back end gestito da <strong>API .NET 8</strong>
							</Card.Title>
							<Card.Text>
								Il back end è gestito da delle API .NET 8 che si
								occupa di gestire le richieste dal frontend, la
								comunicazione con il database e la gestione
								della sicurezza.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Features;
