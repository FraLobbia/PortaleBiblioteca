export interface User {
	id: number;
	name: string;
}

export interface UserState {
	users: User[];
	currentUser: User | null;
	loggedProfile: User | null;
}

export interface loginFormObj {
	email: string;
	password: string;
}
