import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types';

export const fetchUser = createAsyncThunk<User, void>(
	'user/fetchUser',
	async (_, thunkAPI) => {
		try {
			const response = await fetch('https://inbites-api.wmlit.com/api/auth/login/');
		
			if (!response.ok) {
				throw new Error('Failed to fetch user');
			}

			const data: User = await response.json();
			return data;
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('An unknown error occurred');
		}
	}
);
