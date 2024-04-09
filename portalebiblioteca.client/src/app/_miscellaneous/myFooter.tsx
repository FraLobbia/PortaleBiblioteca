import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

const MyFooter = () => {
	return (
		<footer className="footer mt-5 bg-tertiary p-3">
			<div className="container text-center">
				<Row>
					<Col>
						<h3>Informazioni sulla biblioteca</h3>
						<ul>
							<li>
								<a
									target="_blank"
									href="https://www.fralobbia.com">
									Chi siamo
								</a>
							</li>
							<li>
								<a href="/orari">Orari di apertura</a>
							</li>
							<li>
								<a href="/mappa">Mappa e indicazioni</a>
							</li>
						</ul>
					</Col>
					<Col className="footer-section">
						<h3>Servizi offerti</h3>
						<ul>
							<li>
								<a href="/prestito-libri">Prestito libri</a>
							</li>
							<li>
								<a href="/catalogo-online">Catalogo online</a>
							</li>
							<li>
								<a href="/ricerca-bibliografica">
									Ricerca bibliografica
								</a>
							</li>
							<li>
								<a href="/sale-studio">Sale studio e spazi</a>
							</li>
						</ul>
					</Col>

					<Col className="footer-section">
						<h3>Eventi e attività</h3>
						<ul>
							<li>
								<a href="/calendario-eventi">
									Calendario degli eventi
								</a>
							</li>
							<li>
								<a href="/letture-presentazioni">
									Letture e presentazioni
								</a>
							</li>
							<li>
								<a href="/mostre-esposizioni">
									Mostre ed esposizioni
								</a>
							</li>
						</ul>
					</Col>
					<Col className="footer-section">
						<h3>Supporto e assistenza</h3>
						<ul>
							<li>
								<a href="/faq">FAQ</a>
							</li>
							<li>
								<a href="/guida-utilizzo">Guida all'utilizzo</a>
							</li>
							<li>
								<a href="/contatti-assistenza">
									Assistenza e contatti
								</a>
							</li>
						</ul>
					</Col>
					<Col className="footer-section">
						<h3>Link utili</h3>
						<ul>
							<li>
								<a href="https://www.universita.it">
									Università
								</a>
							</li>
							<li>
								<a href="https://www.archivio-digitale.com">
									Archivi digitali
								</a>
							</li>
							<li>
								<a href="https://www.dizionario-online.it">
									Dizionario online
								</a>
							</li>
						</ul>
					</Col>
					<Col className="footer-section">
						<h3>Politiche e normative</h3>
						<ul>
							<li>
								<a href="/politiche-prestito">
									Politiche di prestito
								</a>
							</li>
							<li>
								<a href="/normative-privacy">
									Normative sulla privacy
								</a>
							</li>
							<li>
								<a href="/termini-utilizzo">
									Termini di utilizzo
								</a>
							</li>
						</ul>
					</Col>
					<Col className="footer-section">
						<h3>Seguici sui social media</h3>
						<ul>
							<li>
								<a href="https://www.facebook.com/bibliotecacastelloquinto">
									Facebook
								</a>
							</li>
							<li>
								<a href="https://twitter.com/bibliotecaquinto">
									Twitter
								</a>
							</li>
							<li>
								<a href="https://www.instagram.com/bibliotecacastelloquinto">
									Instagram
								</a>
							</li>
						</ul>
					</Col>
				</Row>

				<span className="text-muted">
					&copy; Biblioteca del Castello di Quinto. Tutti i diritti
					riservati.
				</span>
				<p>
					<FontAwesomeIcon
						className="me-2"
						icon={faCircleExclamation}
					/>
					La biblioteca non esiste!! Il progetto è per un portfolio di
					sviluppo web.
				</p>
			</div>
		</footer>
	);
};

export default MyFooter;
