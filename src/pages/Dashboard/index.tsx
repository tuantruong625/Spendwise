import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

const Dashboard: React.FC = () => {
	const { currentUser, signOut } = useContext(AuthContext);

	return (
		<>
			<h1>Dashboard Page</h1>
			<p>Sign in Status: {currentUser && 'active'}</p>
			<button onClick={signOut}>Sign out</button>
		</>
	);
};

export { Dashboard };
