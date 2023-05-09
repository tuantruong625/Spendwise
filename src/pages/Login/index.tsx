import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { signInUser } from '../../firebase/firebase';
import { EMAIL_VALIDATION } from '../../utils/regexPatterns';

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
		<>
			<h1>LoginPage</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="email">
					Email
					<input
						type="text"
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: EMAIL_VALIDATION,
								message: 'Invalid email, ex. foo@email.com',
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
						})}
					/>
				</label>
				{errors.password && <p>{errors.password.message}</p>}

				<button>Login</button>
			</form>

			<p>
				Don't have an account? <Link to="/">Sign up</Link>
			</p>
		</>
	);
};

export { LoginPage };
