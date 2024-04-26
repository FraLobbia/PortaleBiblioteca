import {
	faArrowsLeftRight,
	faArrowsUpDown,
	faFeather,
	faGlasses,
	faLandmark,
	faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Features = () => {
	return (
		<Container className="mt-5">
			<div className="alert-dark alert shadow">
				<div className="alert-dark alert border-5 border shadow">
					<h1 className="m-3 text-mattone-dark">
						Cosa puoi fare in questo portale?
					</h1>
				</div>
			</div>

			<Row>
				<h2>..come utente</h2>
				<Col>
					<Card className="mb-3">
						<Card.Body>
							<Link to={"/catalogo"}>
								<Card.Title>
									Visualizzazione del Catalogo
									<FontAwesomeIcon
										className="ms-2"
										icon={faGlasses}
									/>
								</Card.Title>
							</Link>
							<Card.Text>
								Il catalogo permette agli utenti di:
								<ul>
									<li>visualizzare tutti i libri</li>
									<li>filtrare per genere ed autore</li>
									<li>
										cercare un libro specifico per titolo,
										autore o parola chiave
									</li>
								</ul>
							</Card.Text>
						</Card.Body>
					</Card>

					<Card className="mb-3">
						<Card.Body>
							<Link to={"/recensioni"}>
								<Card.Title>
									Scrivere recensioni
									<FontAwesomeIcon
										className="ms-2"
										icon={faFeather}
									/>
								</Card.Title>
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
								<Card.Title>
									Prestito Libri
									<FontAwesomeIcon
										className="ms-2"
										icon={faLandmark}
									/>
								</Card.Title>
							</Link>
							<Card.Text>
								<ul>
									<li>
										Richiesta prestito libro dalla sezione
										catalogo
									</li>
								</ul>
								<ul>
									<li>
										Area privata
										<ul>
											<li>Visualizzazione prestiti</li>
											<li>
												Prestiti pronti per il ritiro
											</li>
											<li>
												Suggerimenti per lasciare una
												recensione dei libri letti
											</li>
										</ul>
									</li>
								</ul>
								<span className="text-muted fst-italic">
									La quantità di libri disponibile non conta i
									libri in prestito fuori sede e quelli in
									magazzino (devono prima essere spostati in
									corsia)
								</span>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<hr />
			<Row className="align-items-center">
				<h2>...come bibliotecario</h2>
				<Col>
					<Card className="mb-3">
						<Card.Body>
							<Link to={"/librarian"}>
								<Card.Title>
									Gestione della biblioteca
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
					<Card className="mb-3">
						<Card.Body>
							<Card.Title>Inventario</Card.Title>
							<Card.Text>
								<p>
									L'inventario delle entità dei libri è diviso
									in 4 sezioni principali:
								</p>
								<ul>
									<li>
										<strong>Magazzino</strong>: dove sono
										conservati i libri non disponibili
									</li>
									<li>
										<strong>Corsie</strong>: dove sono
										conservati i libri disponibili
									</li>
									<li>
										<strong>Banco del Bibliotecario</strong>
										: dove sono conservati i libri pronti
										per essere consegnati ai richiedenti
									</li>
									<li>
										<strong>In prestito</strong>: uno
										scaffale virtuale per gestire i libri in
										prestito fuori sede
									</li>
								</ul>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={8} className="text-center">
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
										<FontAwesomeIcon
											icon={faArrowsLeftRight}
										/>
										<span className="ms-2">
											Ogni corsia è lunga{" "}
											<strong>100</strong> baie
										</span>
									</li>
									<li>
										<FontAwesomeIcon
											icon={faArrowsUpDown}
										/>
										<span className="ms-2">
											Ogni baia ha <strong>5 </strong>
											livelli di altezza che corrispondono
											alle lettere dell'alfabeto partendo
											dal basso
										</span>
									</li>
								</ul>
								<p className="text-muted">
									Al momento ci sono 5000 posti per riporre i
									libri, la struttura è pensata e predisposta
									per essere espansa al bisogno.
								</p>
							</Card.Text>
							<img
								src="https://i.imgflip.com/8o3sig.jpg"
								className="img-thumbnail p-0"
								alt="legenda biblioteca"
							/>
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
												ed il check-in di nuove entità
												di libri in magazzino.
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
										disponibili.
									</li>
									<li>
										La prenotazione ricade su un libro nelle
										corsie, quindi il libro{" "}
										<strong>deve essere preso</strong> dal
										bibliotecario e portato al banco
										attraverso l'apposita sezione.
									</li>
									<li>
										Una volta che il libro{" "}
										<strong> si trova al banco </strong>
										può essere consegnato al richiedente.
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
										ancora in corsia
									</li>
									<li>Quantità al banco del bibliotecario</li>
									<li>Quantità fuori sede per prestito</li>
								</ul>
								Questo viene gestito attribuendo un apposito{" "}
								<u>
									<strong>status</strong> all'entità del
									libro.
								</u>
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
