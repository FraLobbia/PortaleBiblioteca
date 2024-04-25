import {
	faBook,
	faCompass,
	faFeather,
	faHeart,
	faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../Functions/hooks";

const HeroSection = () => {
	// store variables
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	return (
		<Row>
			<Col md={6}>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/f/f5/CASTELLO_degli_Avogadro_Quinto_Vercellese.jpg"
					alt="Biblioteca"
					className="mx-auto img-thumbnail border-0 d-block"
				/>
			</Col>
			<Col md={6}>
				<section id="le-nostre-collezioni">
					<h2 className="mt-4 text-end">Le nostre collezioni</h2>
					<p className="pb-1 text-end">
						Esplora le nostre collezioni di libri, suddivise per
						genere e autore. <br /> Oppure leggi le recensioni dei
						nostri utenti.
					</p>
					<div className="d-flex gap-2 flex-wrap justify-content-end">
						<Link to="/catalogo" className="btn btn-mattone shadow">
							<FontAwesomeIcon icon={faBook} />
							<span className="ms-2">Vai al catalogo</span>
						</Link>
						<Link
							to="/recensioni"
							className="btn btn-primary shadow">
							<FontAwesomeIcon icon={faFeather} />
							<span className="ms-2">Leggi le recensioni</span>
						</Link>
					</div>
				</section>

				<section id="i-nostri-servizi">
					<h2 className="mt-4">I nostri servizi</h2>
					<p className="pb-1">
						Esplore le ricchezze della biblioteca: dal prestito dei
						libri alle recensioni più appassionanti. <br /> Scopri
						un mondo di conoscenza e avventura letteraria!
					</p>
					<Link to="/features" className="btn btn-mattone shadow">
						<FontAwesomeIcon icon={faCompass} />
						<span className="ms-2">Che cosa puoi fare</span>
					</Link>
				</section>

				<section id="la-tua-area-personale" className="text-end">
					<h2 className="mt-4">La tua area personale</h2>
					<p className="pb-1">
						Accedi alla tua area personale per vedere i prestiti in
						corso e le tue recensioni.
					</p>
					{user ? (
						<Link
							to="/private-area"
							className="btn btn-primary shadow">
							<FontAwesomeIcon icon={faHeart} />
							<span className="ms-2">Accedi alla tua area</span>
						</Link>
					) : (
						<Link
							to="/user/login"
							className="btn btn-primary shadow">
							<FontAwesomeIcon icon={faRightToBracket} />
							<span className="ms-2">Login</span>
						</Link>
					)}
				</section>
			</Col>
		</Row>
	);
};
export default HeroSection;
