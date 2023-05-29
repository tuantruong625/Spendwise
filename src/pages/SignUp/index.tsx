import { useForm } from 'react-hook-form';
import { signUpUser } from '../../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';

import Column from '../../components/shared/Layout/Column/Column';
import Grid from '../../components/shared/Layout/Grid';
import { EMAIL_VALIDATION } from '../../utils/regexPatterns';
import Background from '../../assets/login-image.png';

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
		formState: { errors },
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
			<Column start={1} end={6} style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
			<Column start={8} end={4} className='flex flex-col justify-center'>
				<div>
				<h1 className='text-3xl font-bold p-0 m-0'>Sign up</h1>
					<p>
						Welcome to your expense tracker, to begin your journey sign up using
						Google or your email.
					</p>
					</div>
				<button className="w-full p-2 bg-slate-800 text-gray-100 my-5">Sign up with Google</button>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
					<label htmlFor="email" className='flex flex-col my-2'>
						Email
						<input
							className='border p-1'
							type="text"
							{...register('email', {
								pattern: {
									value: EMAIL_VALIDATION,
									message: 'Invalid email, ex. email@gmail.com',
								},
							})}
						/>
						{errors.email && <p className='text-gray-600 mt-1'>{errors.email.message}<sup className='text-red-500'>*</sup></p>}
					</label>

					<label htmlFor="password" className='flex flex-col my-2'>
						Password
						<input
							className='border p-1'
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
						{errors.password && <p className='text-gray-600 mt-1'>{errors.password.message}<sup className='text-red-500'>*</sup></p>}
					</label>
					

					<label htmlFor="username" className='flex flex-col my-2'>
						Username
						<input
							className='border p-1'
							type="text"
							{...register('username', { required: 'Username is required' })}
						/>
					</label>
					{errors.username && <p>{errors.username.message}</p>}

					<label htmlFor="terms" className='my-2'>
						<input
							className='mr-2'
							type="checkbox"
							{...register('terms', {
								required: 'Please accept the terms and conditions',
							})}
						/>
						I agree to Spendwise's terms and conditions
					</label>
					{errors.terms && <p>{errors.terms.message}</p>}

					<button className='p-2 border border-slate-500 my-5' type="submit">Sign up</button>
				</form>

				<p>
					Have an account? <Link className="hover:underline" to="login">Login</Link>
				</p>
			</Column>
		</Grid>
	);
};

export default SignUpPage;
