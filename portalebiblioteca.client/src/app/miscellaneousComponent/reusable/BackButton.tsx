import { Link } from "react-router-dom";
interface BackButtonProps {
	path: string;
}
const BackButton = ({ path }: BackButtonProps) => {
	return (
		<Link className="btn btn-primary my-3" to={path}>
			&lt;&lt; Torna al catalogo
		</Link>
	);
};

export default BackButton;
