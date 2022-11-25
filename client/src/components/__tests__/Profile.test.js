import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../Profile';

const MockProfile = () => {
	return(
		<BrowserRouter>
			<Profile />
		</BrowserRouter>
	);
}

describe('Firebase firestore test', () => {
	beforeEach(() => {
		render(
			<MockProfile />
		);
	});

	it('Components load correctly', () => {
		const cloudStorageMenu = screen.getByTestId("cloudStorage-menu");
		fireEvent.click(cloudStorageMenu);
		
		const form = screen.getByTestId("cloudstorage-upload-form");
		expect(form).toBeInTheDocument(); 
	});
	
	
	
});

// describe('test logout modal', () => {
// 	beforeEach(() => {
// 		render(
// 			<MockProfile />
// 		);
// 	});

// 	it('test logout modal component', async () => {
// 		const logoutModalButton = screen.getByTestId("logout-modal-btn");
// 		expect(logoutModalButton).toBeInTheDocument();
// 		// fireEvent.click(logoutModal);

// 		// await waitFor(() => expect(screen.getByTestId("logout-modal")).toBeInTheDocument());
// 	});
	

// });



