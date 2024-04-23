import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyFooter = () => {
	return (
		<footer className="footer mt-5 bg-tertiary p-3">
			<div className="container text-center">
				<Row>
					<Col>
						<h3>Informazioni su questo sito</h3>
						<ul>
							<li>
								<a
									target="_blank"
									href="https://www.fralobbia.com">
									Il mio portfolio
								</a>
							</li>
							<li>
								<a
									target="_blank"
									href="https://www.linkedin.com/in/francesco-lobbia/">
									LinkedIn
								</a>
							</li>
							<li>
								<a
									target="_blank"
									href="https://www.google.com/maps/place/Castello+di+Quinto+Vercellese/@45.3799459,8.3094902,13z/data=!4m10!1m2!2m1!1scastello+quinto!3m6!1s0x47864960cfc3ed6d:0xdf4a2ef8963f32cc!8m2!3d45.3783395!4d8.3619516!15sCg9jYXN0ZWxsbyBxdWludG9aESIPY2FzdGVsbG8gcXVpbnRvkgEGY2FzdGxlmgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU41TFdKaFFXRlJFQUXgAQA!16s%2Fg%2F11gyd1lvs_?hl=it&entry=ttu">
									Dove si trova questo castello?
								</a>
							</li>
						</ul>
					</Col>
					<Col className="footer-section">
						<h3>Servizi offerti</h3>
						<ul>
							<li>
								<Link to="/catalogo">Catalogo online</Link>
							</li>
							<li>
								<Link to="/prestiti">Prestito libri</Link>
							</li>
							<li>
								<Link to="/recensioni">Recensioni</Link>
							</li>
							<li>
								<Link to="/features">
									Che cosa puoi fare su questo sito
								</Link>
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
								<Link to={"/features"}>Guida all'utilizzo</Link>
							</li>
							<li>
								<a href="mailto:fralobbia@gmail.com">
									Assistenza e contatti
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
