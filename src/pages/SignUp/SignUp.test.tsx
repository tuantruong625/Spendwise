import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUpPage from './index';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import { signUpUser } from '../../firebase/firebase';


jest.mock('../../firebase/firebase')
const mockSignUpUser = signUpUser as jest.MockedFunction<typeof signUpUser>

jest.mock('../../assets/login-image.png', () => {
  return {
    default: 'login-image.png'
  }
})



describe('SignUpPage', () => {
  it('renders initial error messages when clicking submit', async () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: 'Sign up' }) as HTMLButtonElement
    userEvent.click(submitButton)
    
    expect(await screen.findByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
    expect(screen.getByText('Username is required')).toBeInTheDocument()
    expect(screen.getByText('Username is required')).toBeInTheDocument()
    expect(screen.getByText('Please accept the terms and conditions')).toBeInTheDocument()
  })


  it('submits form with valid data and redirects to dashboard',  async () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByRole('textbox', { name: /Email/i }) as HTMLInputElement;
    userEvent.type(emailInput, 'test@gmail.com')

    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;
    userEvent.type(passwordInput, 'Foobarbaz1')

    const usernameInput = screen.getByRole('textbox', { name: /Username/i }) as HTMLInputElement
    userEvent.type(usernameInput, 'foobar')

    const termsAndConditionsCheckbox = screen.getByRole('checkbox')
    userEvent.click(termsAndConditionsCheckbox)


    const submitButton = screen.getByRole('button', { name: 'Sign up' }) as HTMLButtonElement 
    fireEvent.submit(submitButton)

    
    await waitFor(() => {
      expect(mockSignUpUser).toHaveBeenCalled()
      expect(mockSignUpUser).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(screen.getByText('Redirected to dashboard')).toBeInTheDocument();
    });


    // expect(await screen.findByText('Email is required')).not.toBeInTheDocument()
    // expect(screen.getByText('Password is required')).not.toBeInTheDocument()
    // expect(screen.getByText('Username is required')).not.toBeInTheDocument()
    // expect(screen.getByText('Username is required')).not.toBeInTheDocument()
    // expect(screen.getByText('Please accept the terms and conditions')).not.toBeInTheDocument()

  });
});
