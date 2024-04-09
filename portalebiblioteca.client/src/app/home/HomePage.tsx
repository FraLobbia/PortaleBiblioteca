import {
	faBook,
	faCalendarDay,
	faFeather,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const HomePage = () => {
	return (
		<div className="home-page container">
			<header>
				<h1 className="text-center">
					Benvenuti nella Biblioteca del Castello di Quinto
				</h1>
			</header>
			<main className="row">
				<Col md={6}>
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/f/f5/CASTELLO_degli_Avogadro_Quinto_Vercellese.jpg"
						alt="Biblioteca"
						className="mx-auto img-thumbnail border-0 d-block"
					/>
				</Col>
				<Col md={6}>
					<section className="collections">
						<h2 className="mt-4">Le nostre collezioni</h2>
						<p className="pb-1">
							Esplora le nostre collezioni di libri, suddivise per
							genere e autore. Oppure leggi le recensioni dei
							nostri utenti.
						</p>
						<div className="d-flex gap-2 flex-wrap">
							<Link to="/catalogo" className="btn btn-mattone">
								<FontAwesomeIcon icon={faBook} />
								<span className="ms-2">Vai al catalogo</span>
							</Link>
							<Link to="/reviews" className="btn btn-primary">
								<FontAwesomeIcon icon={faFeather} />
								<span className="ms-2">
									Leggi le recensioni
								</span>
							</Link>
						</div>
					</section>
					<section className="section events">
						<h2 className="mt-4">Eventi e attività</h2>
						<p className="pb-1">
							Esplore le ricchezze della biblioteca: dal prestito
							dei libri alle recensioni più appassionanti.
						</p>
						<Link to="/events" className="btn btn-mattone">
							<FontAwesomeIcon icon={faCalendarDay} />
							<span className="ms-2">
								Controlla il calendario
							</span>
						</Link>
					</section>
					<section className="section services">
						<h2 className="mt-4">I nostri servizi</h2>
						<p className="pb-1">
							Esplore le ricchezze della biblioteca: dal prestito
							dei libri alle recensioni più appassionanti. Scopri
							un mondo di conoscenza e avventura letteraria!
						</p>
						<Link to="/events" className="btn btn-mattone">
							<FontAwesomeIcon icon={faCalendarDay} />
							<span className="ms-2">Che cosa facciamo</span>
						</Link>
					</section>
				</Col>
			</main>
		</div>
	);
};

export default HomePage;
