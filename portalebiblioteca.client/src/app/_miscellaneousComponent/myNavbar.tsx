import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { logout } from "../../redux/slicers/userSlice";
import logo from "../../assets/images/logo.png";
import userTemplateImage from "../../assets/images/userTemplateImage.jpg";
function MyNavbar() {
	const dispatch = useAppDispatch();
	const { permissionsToEdit, user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<Navbar expand="md" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand>
					<Link to="/" className="nav-link">
						<img
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top me-3"
							alt="logo della biblioteca"
						/>
						Biblioteca Quinto Vercellese
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					className=" justify-content-md-between"
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
								title={
									<span>
										<img
											src={
												user.userImage
													? user.userImage
													: userTemplateImage
											}
											style={{
												borderRadius: "50%",
												objectFit: "cover",
												marginTop: "-3px",
											}}
											width="30"
											height="30"
											className="d-inline-block align-top me-1"
											alt="immagine profilo utente"
										/>
										{user.firstName + " " + user.lastName}
									</span>
								}
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
