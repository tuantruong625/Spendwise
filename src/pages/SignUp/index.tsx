import { useForm } from 'react-hook-form';
import { signUpUser } from '../../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';

import Column from '../../components/shared/Column/Column';
import Grid from '../../components/shared/Grid';
import { EMAIL_VALIDATION } from '../../utils/regexPatterns';

interface SignUpType {
	email: string;
	password: string;
	username: string;
	terms: boolean;
}

const SignUpPage: React.FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			username: '',
			terms: false,
		},
	});

	const navigate = useNavigate();

	const onSubmit = async (data: SignUpType) => {
		try {
			const payload = await signUpUser(data.email, data.password);

			if (payload) {
				navigate('/dashboard');
			}
		} catch (error) {
			console.log('User failed to signup', error);
		}
	};

	return (
		<Grid cols={12} gap="1.5rem" style={{ height: '100vh' }}>
			<Column start={1} end={6} style={{ backgroundColor: '#e2e2e2' }} />
			<Column start={7} end={12}>
				<h1>Sign up</h1>
				<p>
					Welcome to your expense tracker, to begin your journey sign up using
					Google or your email.
				</p>
				<button>Sign up with Google</button>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="email">
						Email
						<input
							type="text"
							{...register('email', {
								pattern: {
									value: EMAIL_VALIDATION,
									message: 'Invalid email, ex. email@gmail.com',
								},
							})}
						/>
					</label>
					{errors.email && <p>{errors.email.message}</p>}

					<label htmlFor="password">
						Password
						<input
							type="password"
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 8,
									message: 'Password must be at least 8 characters long',
								},
								pattern: {
									value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
									message:
										'Password must contain at least one uppercase letter, one lowercase letter, and one number',
								},
							})}
						/>
					</label>
					{errors.password && <p>{errors.password.message}</p>}

					<label htmlFor="username">
						Username
						<input
							type="text"
							{...register('username', { required: 'Username is required' })}
						/>
					</label>
					{errors.username && <p>{errors.username.message}</p>}

					<label htmlFor="terms">
						<input
							type="checkbox"
							{...register('terms', {
								required: 'Please accept the terms and conditions',
							})}
						/>
						I agree to Spendwise's terms and conditions
					</label>
					{errors.terms && <p>{errors.terms.message}</p>}

					<button type="submit">Sign up</button>
				</form>

				<p>
					Have an account?<Link to="login">Login</Link>
				</p>
			</Column>
		</Grid>
	);
};

export default SignUpPage;
