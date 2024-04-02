import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<h1 className="text-center my-3">
				Benvenuti alla biblioteca civica di Quinto Vercellese
			</h1>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/f/f5/CASTELLO_degli_Avogadro_Quinto_Vercellese.jpg"
				alt="Biblioteca"
				className="img-fluid mx-auto d-block"
			/>
			<Link
				className="mx-auto mt-3 btn btn-primary d-block"
				to="/catalogo">
				Vai al catalogo
			</Link>
		</div>
	);
};

export default Home;
