export interface User {
	idUser: number;
	firstName: string;
	lastName: string;
	email: string;
	role: "admin" | "librarian" | "user" | string;
	userImage: string;
}

export interface UserState {
	users: User[];
	loggedProfile: {
		token: string;
		permissionsToEdit: boolean;
		user: User | null;
	};
}

export interface LoginModel {
	email: string;
	password: string;
}

export interface SignUpModel {
	FirstName: string;
	LastName: string;
	Email: string;
	Password: string;
}
