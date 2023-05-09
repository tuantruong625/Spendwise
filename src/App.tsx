import { useContext, useEffect } from 'react';
import { Container } from './components/shared/Container';
import SignupPage from './pages/SignUp';
import { AuthContext } from './context/auth-context';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import RequireAuth from './components/shared/RequiredAuth';

function App() {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	console.log('User:', !!currentUser);

	useEffect(() => {
		if (currentUser) {
			navigate('/dashboard');
		}
	}, [currentUser, navigate]);

	return (
		<Routes>
			<Route
				index
				element={
					<Container>
						<SignupPage />
					</Container>
				}
			/>
			<Route
				path="dashboard"
				element={
					<RequireAuth>
						<Dashboard />
					</RequireAuth>
				}
			/>
		</Routes>
	);
}

export default App;
