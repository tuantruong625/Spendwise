import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { signInUser, signInAuth } from '../../firebase/firebase';
import { EMAIL_VALIDATION } from '../../utils/regexPatterns';
import Column from '../../components/shared/Layout/Column/Column';
import Grid from '../../components/shared/Layout/Grid';
import Background from '../../assets/login-image.png';

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
			<Column
				start={1}
				end={6}
				style={{
					backgroundImage: `url(${Background})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			/>
			<Column start={8} end={4} className="flex flex-col justify-center">
				<div className="mb-5">
					<h1 className="text-3xl font-bold">Login</h1>
					<p>
						Welcome to Spendwise, to continue your journey sign in using google
						or your email.
					</p>
				</div>
				<button
					className="border border-gray-400 w-full mb-5 p-2"
					onClick={signInAuth}
				>
					Login using google
				</button>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="email" className="flex flex-col">
						Email
						<input
							className="border p-1"
							type="text"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: EMAIL_VALIDATION,
									message: 'Invalid email, ex. foo@email.com',
								},
							})}
						/>
						{errors.email && <p className='text-gray-600 mt-1'>{errors.email.message}<sup className='text-red-500'>*</sup></p>}
					</label>

					<label htmlFor="password" className="flex flex-col mt-5">
						Password
						<input
							className="flex flex-col border p-1"
							type="password"
							{...register('password', {
								required: 'Password is required',
							})}
						/>
						{errors.password && <p className='text-gray-600 mt-1'>{errors.password.message}<sup className='text-red-500'>*</sup></p>}
					</label>

					<button
						type="submit"
						className="w-full p-2 bg-slate-800 text-gray-100 mt-5"
					>
						Login
					</button>
				</form>

				<p className="mt-5">
					Don't have an account?{' '}
					<Link to="/" className="hover:underline">
						Sign up
					</Link>
				</p>
			</Column>
		</Grid>
	);
};

export { LoginPage };
