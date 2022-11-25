import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../javascript/firebase'
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';

const MockRegister = () => {
    return (
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );
}

describe('Register render page', () => {
    beforeEach(() => {
        render(
            <MockRegister />
        );
    });

    it('Renders register page', () => {
        const headingElement = screen.getByRole('heading', { name: /Register/i });
        expect(headingElement).toBeInTheDocument();
    });

    it('Renders four input fields', () => {
        const usernameLabelingElement = screen.getByLabelText(/Username/i);
        const emailLabelingElement = screen.getByLabelText(/Email Address/i);
        const passwordLabelingElement = screen.getByLabelText(/New Password/i);
        const ConfirmPswLabelingElement = screen.getByLabelText(/Confirm password/i);
        expect(usernameLabelingElement).toBeInTheDocument();
        expect(emailLabelingElement).toBeInTheDocument();
        expect(passwordLabelingElement).toBeInTheDocument();
        expect(ConfirmPswLabelingElement).toBeInTheDocument();
    });

    it('renders a submit button', () => {
        const submitButton = screen.getByText('Submit');
        expect(submitButton).toBeInTheDocument(); 
    });
    
});

describe('Form behaviour', () => {

    describe('Username should be non-empty alphanumeric username', () => {

        beforeEach(() => {
            render(
                <MockRegister />
            );
        });

        it('Username should be non-empty', () => {
            const usernameElement = screen.getByPlaceholderText(/akashtharuka/i);
            const submitButton = screen.getByText('Submit');

            fireEvent.change(usernameElement, { target: { value: "" } });
            fireEvent.click(submitButton);

            expect(screen.getByText(/Username cannot be empty/i)).toBeInTheDocument();
        });
        
        it('Username should only contain alphanumeric characters', () => {
            const usernameElement = screen.getByPlaceholderText(/akashtharuka/i);
            const submitButton = screen.getByText('Submit');

            fireEvent.change(usernameElement, { target: { value: "#@Akash" } });
            fireEvent.click(submitButton);

            expect(screen.getByText(/Only alphanumeric characters/i)).toBeInTheDocument();
        });
    });

    describe('Email should be non-empty and valid', () => {

        beforeEach(() => {
            render(
                <MockRegister />
            );
        });

        it('Email should be non-empty', () => {
            const emailElement = screen.getByPlaceholderText(/name@example.com/i);
            const submitButton = screen.getByText('Submit');

            fireEvent.change(emailElement, { target: { value: "" } });
            fireEvent.click(submitButton);

            expect(screen.getByText(/Email cannot be empty/i)).toBeInTheDocument();
        });

        it('Email should be a valid email', () => {
            const emailElement = screen.getByPlaceholderText(/name@example.com/i);
            const submitButton = screen.getByText('Submit');

            fireEvent.change(emailElement, { target: { value: "test@Invalid" } });
            fireEvent.click(submitButton);
            expect(screen.getByText(/Not a valid email/i)).toBeInTheDocument();

            fireEvent.change(emailElement, { target: { value: "testInvalid" } });
            fireEvent.click(submitButton);
            expect(screen.getByText(/Not a valid email/i)).toBeInTheDocument();
        });
        
    });
    
    describe('Password should be non-empty and have at least one digit, one letter and minimum 8 characters', () => {

        beforeEach(() => {
            render(
                <MockRegister />
            );
        });

        it('Password should be non-empty', () => {
            const passwordElement = screen.getAllByPlaceholderText(/admin1234/i)[0];
            const submitButton = screen.getByText('Submit');

            fireEvent.change(passwordElement, { target: { value: "" } });
            fireEvent.click(submitButton);

            expect(screen.getByText(/Password cannot be empty/i)).toBeInTheDocument();
        });

        it('Password should have at least one digit', () => {
            const passwordElement = screen.getAllByPlaceholderText(/admin1234/i)[0];
            const submitButton = screen.getByText('Submit');

            fireEvent.change(passwordElement, { target: { value: "testpassword" } });
            fireEvent.click(submitButton);

            expect(screen.getByText(/At least one digit, one letter, and minimum 8 characters/i)).toBeInTheDocument();
        });

        it('Password should have at least one letter', () => {
            const passwordElement = screen.getAllByPlaceholderText(/admin1234/i)[0];
            const submitButton = screen.getByText('Submit');

            fireEvent.change(passwordElement, { target: { value: "123456789" } });
            fireEvent.click(submitButton);

            expect(screen.getByText(/At least one digit, one letter, and minimum 8 characters/i)).toBeInTheDocument();
        });

        it('Password should have minimum 8 characters', () => {
            const passwordElement = screen.getAllByPlaceholderText(/admin1234/i)[0];
            const submitButton = screen.getByText('Submit');

            fireEvent.change(passwordElement, { target: { value: "test123" } });
            fireEvent.click(submitButton);

            expect(screen.getByText(/At least one digit, one letter, and minimum 8 characters/i)).toBeInTheDocument();
        });
    });

    describe('Confirm password should be non-empty and exactly match the password', () => {

        beforeEach(() => {
            render(
                <MockRegister />
            );
        });

        it('Confirm password should be non-empty', () => {
            const confirmPasswordElement = screen.getAllByPlaceholderText(/admin1234/i)[1];
            const submitButton = screen.getByText('Submit');

            fireEvent.change(confirmPasswordElement, { target: { value: "" } });
            fireEvent.click(submitButton);

            expect(screen.getByText(/Please confirm the password/i)).toBeInTheDocument();
        });
        

        it('Confirm password should exactly match the password', () => {
            const passwordElement = screen.getAllByPlaceholderText(/admin1234/i)[0];
            const confirmPasswordElement = screen.getAllByPlaceholderText(/admin1234/i)[1];
            const submitButton = screen.getByText('Submit');

            fireEvent.change(passwordElement, { target: { value: "test1234" } });
            fireEvent.change(confirmPasswordElement, { target: { value: "test12345" } });
            fireEvent.click(submitButton);

            expect(screen.getByText(/Password mismatch/i)).toBeInTheDocument();
        });
    });

    describe('Backend errors in signing up', () => {
        it('Signing up with an already registered email should throw a firebase error', async () => {
            let error = '';

            try{
                await createUserWithEmailAndPassword(auth, 'test@test.com', 'test1234');
            }
            catch(err){
                error = err.toString();
            }
            expect(error).toEqual('FirebaseError: Firebase: Error (auth/email-already-in-use).');
        });
    });
	
	describe('Firebase error handling', () => {

		beforeEach(() => {
            render(
                <MockRegister />
            );
        });

		it('Already existing email', async () => {
			const usernameElement = screen.getByPlaceholderText(/akashtharuka/i);
			const emailElement = screen.getByPlaceholderText(/name@example.com/i);
			const passwordElement = screen.getAllByPlaceholderText(/admin1234/i)[0];
			const confirmPasswordElement = screen.getAllByPlaceholderText(/admin1234/i)[1];

			const submitButton = screen.getByText('Submit');

			fireEvent.change(usernameElement, { target: { value: "testUsername" } });
			fireEvent.change(emailElement, { target: { value: "test2@test.com" } });
			fireEvent.change(passwordElement, { target: { value: "test1234" } });
			fireEvent.change(confirmPasswordElement, { target: { value: "test1234" } });

			fireEvent.click(submitButton);

			await waitFor(() => expect(screen.getByText(/Email already registered/i)).toBeInTheDocument());


		});
		
	});
	
    
});

