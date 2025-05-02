export interface User {
	id: number;
	name: string;
	email: string;
	// Add any other user-specific fields here
}

// Define a type for the Redux state, if needed
export interface RootState {
	user: UserState;
	// other slices of state go here
}

// Define the state for the user slice
export interface UserState {
	user: User | null;
	loading: boolean;
	error: string | null;
}
