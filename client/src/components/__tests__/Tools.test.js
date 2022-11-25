import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Tools from '../Tools';
import sample_pdf from '../../resources/sample-pdf-file.pdf';

const MockTools = () => {
	return(
		<BrowserRouter>
			<Tools />
		</BrowserRouter>
	);
}

describe('Test the tool components loading', () => {
	beforeEach(() => {
		render(
			<MockTools />
		);
	});

	it('test the tool cards loading', () => {
		const toolCards = screen.getAllByTestId("tool-card");
		expect(toolCards.length).toBe(5);
	});

	describe('test the tool modals loading', () => {
		it('test merge modal loading', () => {
			const mergeToolCard = screen.getAllByTestId("tool-card")[0];
			fireEvent.click(mergeToolCard);
			
			const mergeModal = screen.getByTestId("merge-modal");
			expect(mergeModal).toBeInTheDocument();
		});

		it('test ocr modal loading', () => {
			const ocrToolCard = screen.getAllByTestId("tool-card")[1];
			fireEvent.click(ocrToolCard);
			
			const ocrModal = screen.getByTestId("ocr-modal");
			expect(ocrModal).toBeInTheDocument();
		});

		it('test split modal loading', () => {
			const splitToolCard = screen.getAllByTestId("tool-card")[2];
			fireEvent.click(splitToolCard);
			
			const splitModal = screen.getByTestId("split-modal");
			expect(splitModal).toBeInTheDocument();
		});

		it('test add page modal loading', () => {
			const addPageToolCard = screen.getAllByTestId("tool-card")[3];
			fireEvent.click(addPageToolCard);
			
			const addPageModal = screen.getByTestId("addPage-modal");
			expect(addPageModal).toBeInTheDocument();
		});

		it('test remove page modal loading', () => {
			const removePageToolCard = screen.getAllByTestId("tool-card")[4];
			fireEvent.click(removePageToolCard);
			
			const removePageModal = screen.getByTestId("removePage-modal");
			expect(removePageModal).toBeInTheDocument();
		});
		
	});
	
});

describe('Test merge modal', () => {
	beforeEach(() => {
		render(
			<MockTools />
		);
	});

	it('test file upload errors', () => {
		const runBtn = screen.getByTestId("mergeModal-run");
		fireEvent.click(runBtn);

		expect(screen.getByText(/Select more than one file to merge/i)).toBeInTheDocument();
	});

	it('test files uploaded to merge', () => {
		const uploadBtn = screen.getByTestId("merge-upload");
		expect(uploadBtn).toBeInTheDocument();

		const uploadInput = screen.getByTestId("merge-upload-input");
		fireEvent.click(uploadBtn);

		const file = new File([sample_pdf], 'test_pdf.pdf', { type: 'application/pdf' });
		userEvent.upload(uploadInput, file);

		expect(uploadInput.files.length).toBe(1);
		
	});

	// it('test clear uploaded files', () => {
	// 	const uploadBtn = screen.getByTestId("merge-upload");
	// 	const uploadInput = screen.getByTestId("merge-upload-input");
	// 	fireEvent.click(uploadBtn);
	// 	const file = new File([sample_pdf], 'test_pdf.pdf', { type: 'application/pdf' });
	// 	userEvent.upload(uploadInput, file);

	// 	const clearBtn = screen.getByTestId("merge-upload-clear");
	// 	fireEvent.click(clearBtn);

	// 	expect(uploadInput.files.length).toBe(0);
	// });
	
	
	
});



