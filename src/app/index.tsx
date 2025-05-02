// pages/index.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../app/store/useractions'; 
import { AppDispatch } from '../app/store/store';

const HomePage = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const loadUser = async () => {
			try {
				const resultAction = await dispatch(fetchUser());
				const user = resultAction.payload; 
				console.log('User fetched:', user);
			} catch (err) {
				console.error('Error fetching user:', err);
			}
		};

		loadUser();
	}, [dispatch]);

	return <h1>Welcome</h1>;
};

export default HomePage;
