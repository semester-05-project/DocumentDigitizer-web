import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { signInWithEmailAndPassword, isAuthenticated } from 'firebase/auth';
import { auth } from '../../javascript/firebase';

const MockLogin = () => {
    return (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );
}

describe('Login render page', () => {

    beforeEach(() => {
        render(
            <MockLogin />
        );
    });

    it('renders login page', () => {
        const headingElement = screen.getByRole('heading', { name: /Login/i });
        expect(headingElement).toBeInTheDocument();
    });

    it('renders two input fields', () => {
        const emailLabelingElement = screen.getByLabelText(/Email Address/i);
        const passwordLabelingElement = screen.getByLabelText(/Password/i);
        expect(emailLabelingElement).toBeInTheDocument();
        expect(passwordLabelingElement).toBeInTheDocument();
    });

    it('renders a submit button', () => {
        const submitButton = screen.getByText('Submit');
        expect(submitButton).toBeInTheDocument();
    });
    
});

describe('Form behaviour', () => {

    beforeEach(() => {
        render(
            <MockLogin />
        );
    });

    it('Empty email and password should display errors and should not allow form submit', () => {
        const emailInputElement = screen.getByPlaceholderText(/name@example.com/i);
        const passwordInputElement = screen.getByPlaceholderText(/admin1234/i);
        const buttonElement = screen.getByText(/Submit/i);

        // to have both input fields empty when submitting
        fireEvent.change(emailInputElement, { target: { value: "" } });
        fireEvent.change(passwordInputElement, { target: { value: "" } });
        fireEvent.click(buttonElement);
        expect(screen.getByText(/Authentication Error/i)).toBeInTheDocument();

        // to have only password field empty when submitting
        fireEvent.change(emailInputElement, { target: { value: "test@test.com" } });
        fireEvent.click(buttonElement);
        expect(screen.getByText(/Authentication Error/i)).toBeInTheDocument();

        // to have only email field empty when submitting
        fireEvent.change(emailInputElement, { target: { value: "" } });
        fireEvent.change(passwordInputElement, { target: { value: "admin1234" } });
        fireEvent.click(buttonElement);
        expect(screen.getByText(/Authentication Error/i)).toBeInTheDocument();
    });

    it('Signing in with wrong email should throw not found error', async () => {
        let error = '';
        try{
            await signInWithEmailAndPassword(auth, 'notregistered@firebase.com', 'password');
        }
        catch (err){
            error = err.toString();
        }

        expect(error).toEqual('FirebaseError: Firebase: Error (auth/user-not-found).');
    });

    // it('Signing in with wrong password should throw wrong password error', async () => {
    //     let error = '';
    //     try{
    //         await signInWithEmailAndPassword(auth, 'test@test.com', 'wrongpassword');
    //     }
    //     catch (err){
    //         error = err.toString();
    //     }

    //     expect(error).toEqual('FirebaseError: Firebase: Error (auth/wrong-password).');
    // });

    it('Signing in with wrong password too many times should throw too many requests error', async () => {
        let error = '';
        try{
            await signInWithEmailAndPassword(auth, 'test@test.com', 'wrongpassword');
            await signInWithEmailAndPassword(auth, 'test@test.com', 'wrongpassword2');
            await signInWithEmailAndPassword(auth, 'test@test.com', 'wrongpassword3');
            await signInWithEmailAndPassword(auth, 'test@test.com', 'wrongpassword4');
            await signInWithEmailAndPassword(auth, 'test@test.com', 'wrongpassword5');
        }
        catch (err){
            error = err.toString();
        }

        expect(error).toEqual('FirebaseError: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).');
    });

    it('Should login with correct credentials', async () => {
        const user = await signInWithEmailAndPassword(auth, 'tharukaeaa.19@gmail.com', 'test1234');
        expect(user.user).toBeTruthy();
    });
    
    
});



