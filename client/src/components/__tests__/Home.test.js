import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Home	from '../Home';


const MockHome = () => {
	return(
		<BrowserRouter>
			<Home />
		</BrowserRouter>
	);
}

describe('Components load correctly in the home page', () => {
	beforeEach(() => {
		render(
			<MockHome />
		);
	});

	it('test hero section', () => {
		const heroSection = screen.getByTestId("hero-section");
		expect(heroSection).toBeInTheDocument();
	});
	
});




