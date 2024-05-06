import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { fetchEditUser } from "../../api/users/userFetches";
import { UserToEdit } from "../../interfaces/profile.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import BackButton from "../_miscellaneous/reusable/BackButton";

const EditProfile = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	const [name, setName] = useState<string>("");
	const [cognome, setCognome] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [immagineProfilo, setImmagineProfilo] = useState<string>("");
	const [show, setShow] = useState<boolean>(false);

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!user) return;

		const userToEdit: UserToEdit = {
			idUser: user.idUser,
			firstName: name,
			lastName: cognome,
			email: email,
			role: user.role,
			userImage: immagineProfilo,
		};

		dispatch(fetchEditUser(userToEdit));
		navigate("/");
	};

	useEffect(() => {
		if (user) {
			setName(user.firstName);
			setCognome(user.lastName);
			setEmail(user.email);
			setImmagineProfilo(user.userImage);
		}
	}, [user]);

	return (
		<Form onSubmit={handleSignUp}>
			<Container>
				<BackButton />
				<Row>
					<h1>Modifica il tuo profilo</h1>
					<Col xs={12}>
						<Form.Group className="mb-3">
							<div className="d-flex  align-items-center gap-2 justify-content-start">
								<div className="d-flex align-items-center gap-2 justify-content-start">
									<img
										onClick={() => {
											setShow(!show);
										}}
										src={immagineProfilo}
										alt="immagine profilo"
										style={{
											borderRadius: "50%",
											objectFit: "cover",
											height: "130px",
											width: "130px",
										}}
										width="30"
										height="30"
										className="d-inline-block align-top me-1"
									/>

									<Button
										onClick={() => {
											setShow(!show);
										}}
										className="d-flex align-items-center gap-2 justify-content-center"
										variant="primary">
										<FontAwesomeIcon icon={faCamera} />
										<span>Cambia immagine profilo</span>
									</Button>
								</div>
							</div>

							<Form.Label hidden={!show}>
								Immagine profilo
							</Form.Label>
							<Form.Control
								hidden={!show}
								type="text"
								placeholder="Inserisci la tua immagine profilo"
								value={immagineProfilo}
							/>
						</Form.Group>
					</Col>
					<Col xs={6}>
						<Form.Group className="mb-3">
							<Form.Label>Nome</Form.Label>
							<Form.Control
								type="text"
								placeholder="Inserisci il tuo nome"
								value={name}
								onChange={(e) => setName(e.currentTarget.value)}
							/>
						</Form.Group>
					</Col>
					<Col xs={6}>
						<Form.Group className="mb-3">
							<Form.Label>Cognome</Form.Label>
							<Form.Control
								type="text"
								placeholder="Inserisci il tuo cognome"
								value={cognome}
								onChange={(e) =>
									setCognome(e.currentTarget.value)
								}
							/>
						</Form.Group>
					</Col>
					<Col xs={12}>
						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="text"
								placeholder="Inserisci la tua email"
								value={email}
								onChange={(e) =>
									setEmail(e.currentTarget.value)
								}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Button variant="primary" type="submit">
							Modifica profilo
						</Button>
					</Col>
				</Row>
			</Container>
		</Form>
	);
};

export default EditProfile;
