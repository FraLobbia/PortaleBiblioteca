import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { logout } from "../../redux/slicers/userSlice";

function MyNavbar() {
	const dispatch = useAppDispatch();
	const { permissionsToEdit, user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="#home">
					Biblioteca Quinto Vercellese
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					className=" justify-content-lg-between"
					id="basic-navbar-nav">
					<Nav>
						<NavLink className={"nav-link"} to="/">
							Home
						</NavLink>
						<NavDropdown title="Catalogo" id="basic-nav-dropdown">
							<NavDropdown.Item as={NavLink} to="/catalogo">
								Elenco libri
							</NavDropdown.Item>
							{permissionsToEdit && (
								<NavDropdown.Item
									as={NavLink}
									to="/catalogo/add">
									Aggiungi nuovo libro
								</NavDropdown.Item>
							)}
							{/* <NavDropdown.Divider />
							<NavDropdown.Item>Separated link</NavDropdown.Item> */}
						</NavDropdown>
					</Nav>
					<Nav>
						{user ? (
							<NavDropdown
								title={user.firstName + " " + user.lastName}
								id="basic-nav-dropdown">
								<NavDropdown.Item as={NavLink} to="/catalogo">
									Libri osservati
								</NavDropdown.Item>
								<NavDropdown.Item
									as={NavLink}
									to="/catalogo/add">
									I tuoi libri in prestito
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item>
									<Link to="/user/edit" className="nav-link">
										Modifica il tuo profilo
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Item>
									<Link
										to="/"
										className="nav-link text-danger"
										onClick={() => handleLogout()}>
										Logout
									</Link>
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Link to="/user/login" className="nav-link">
								Login
							</Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default MyNavbar;
