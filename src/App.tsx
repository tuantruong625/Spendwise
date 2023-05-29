import { useContext, useEffect } from 'react';
import { Container } from './components/shared/Layout/Container';
import SignupPage from './pages/SignUp';
import { AuthContext } from './context/auth-context';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import RequireAuth from './components/shared/RequiredAuth';
import { LoginPage } from './pages/Login';
import './index.css'

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

			<Route path="login" element={<LoginPage />} />
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
