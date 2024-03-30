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
	loggedProfile: loggedProfile;
}

export interface loggedProfile {
	token: string;
	permissionsToEdit: boolean;
	user: User | null;
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

export interface UserToEdit {
	idUser: number;
	firstName: string;
	lastName: string;
	email: string;
	role: "admin" | "librarian" | "user" | string;
	userImage: string;
}
