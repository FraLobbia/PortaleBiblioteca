import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { fetchEditUser } from "../../api/users/userFetches";
import { UserToEdit } from "../../interfaces/profile.interface";

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
		<Container>
			<Form onSubmit={handleSignUp}>
				<h1>Modifica il tuo profilo</h1>

				<Form.Group className="mb-3">
					<Form.Label>Nome</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci il tuo nome"
						value={name}
						onChange={(e) => setName(e.currentTarget.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Cognome</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci il tuo cognome"
						value={cognome}
						onChange={(e) => setCognome(e.currentTarget.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci la tua email"
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Immagine profilo</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci la tua immagine profilo"
						value={immagineProfilo}
						onChange={(e) =>
							setImmagineProfilo(e.currentTarget.value)
						}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Modifica profilo
				</Button>
			</Form>
		</Container>
	);
};

export default EditProfile;
