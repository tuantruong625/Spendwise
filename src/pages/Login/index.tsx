import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { signInUser, signInAuth } from '../../firebase/firebase';
import { EMAIL_VALIDATION } from '../../utils/regexPatterns';
import Column from '../../components/shared/Layout/Column/Column';
import Grid from '../../components/shared/Layout/Grid';
import styled from 'styled-components';

const StyledInput = styled.input`

`

const StyledLabel = styled.label`
	display: flex;
	flex-direction: column;
`

const LoginPage: React.FC = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: { email: string; password: string }) => {
		try {
			await signInUser(data.email, data.password);
		} catch (error) {
			console.error('login error', error);
		}
	};

	return (
		<Grid cols={12} gap="1.5rem" style={{ height: '100vh' }}>
			<Column start={1} end={6} style={{ backgroundColor: '#e2e2e2' }} />
			<Column start={7} end={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<h1>Login</h1>
				<p>Welcome to Spendwise, to continue your journey sign in using google or your email.</p>
				<button onClick={signInAuth}>Login using google</button>
				<form onSubmit={handleSubmit(onSubmit)}>
				<StyledLabel htmlFor="email">
					Email
					<StyledInput
						type="text"
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: EMAIL_VALIDATION,
								message: 'Invalid email, ex. foo@email.com',
							},
						})}
					/>
				</StyledLabel>
				{errors.email && <p>{errors.email.message}</p>}

				<StyledLabel htmlFor="password">
					Password
					<StyledInput
						type="password"
						{...register('password', {
							required: 'Password is required',
						})}
					/>
				</StyledLabel>
				{errors.password && <p>{errors.password.message}</p>}

				<button>Login</button>
			</form>

			<p>
				Don't have an account? <Link to="/">Sign up</Link>
			</p>

			</Column>
		</Grid>
	);
};

export { LoginPage };
