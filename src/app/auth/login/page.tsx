'use client'; 

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../store/store';
import { setUser } from '../../store/userslice';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { z } from 'zod';

// Zod schema for validation
const LoginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Define the API response type (example)
interface ApiResponse {
	user: {
		name: string;
		email: string;
	};
	accessToken: string;
}

export default function LoginPage() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

	const handleLogin = async () => {
		// Validate form input using Zod schema
		const result = LoginSchema.safeParse({ email, password });

		// If validation fails, collect errors and return early
		if (!result.success) {
			const fieldErrors: Record<'email' | 'password', string | undefined> = { email: undefined, password: undefined };

			result.error.errors.forEach((err) => {
				fieldErrors[err.path[0] as 'email' | 'password'] = err.message;
			});

			setErrors(fieldErrors);
			return;
		}

		setErrors({}); // Clear errors

		try {
			const res = await fetch('https://inbites-api.wmlit.com/api/auth/login/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (res.ok) {
				const responseData: ApiResponse = data;
				console.log(responseData, 'res', responseData.accessToken);
				
				Cookies.set('token', responseData.accessToken, {expires: 7});
				dispatch(setUser(responseData.user));
				router.push('/dashboard');
			} else {
				const errorMessage = data?.message || 'Login failed';
				alert(errorMessage);
			}
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-50">
			<div className="w-full max-w-md p-6 bg-white rounded shadow-md">
				<h2 className="text-xl font-bold mb-14 text-center text-black ">Login</h2>

				<input
					className="w-full p-2 mb-4 border rounded text-black"
					placeholder="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

				<input
					type="password"
					className="w-full p-2 mb-8 border rounded text-black"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

				<button
					onClick={handleLogin}
					className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Login
				</button>
			</div>
		</div>
	);
}
