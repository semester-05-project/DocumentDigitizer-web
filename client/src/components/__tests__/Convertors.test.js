import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Convertors from '../Convertors';
import sample_pdf from '../../resources/sample-pdf-file.pdf';
import test_docx from '../../resources/test1.docx';


const MockConvertor = () => {
	return (
        <BrowserRouter>
            <Convertors />
        </BrowserRouter>
    );
}

describe('renders all the convertors', () => {
	beforeEach(() => {
		render(
			<MockConvertor />
		);
	});

	it('renders all the convertors', () => {
		const numberOfConvertors = screen.getAllByTestId('convertor');
		expect(numberOfConvertors.length).toBe(11);
	});

	it('renders all the upload modals', () => {
		const numberOfUploadModals = screen.getAllByTestId('upload-modal-form', { ariaHidden: true });
		expect(numberOfUploadModals.length).toBe(11);
	});
	
});

describe('File upload in convertors', () => {
	beforeEach(() => {
		render(
			<MockConvertor />
		);
	});

	it('docx to pdf convertor file upload check', () => {
		const docxToPdfInput = screen.getByTestId('docx-input');
		fireEvent.click(docxToPdfInput);

		const file = new File([test_docx], 'test-file-name-that-has-a-length-more-than-twelve.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
		userEvent.upload(docxToPdfInput, file);

		expect(docxToPdfInput.files.length).toBe(1);
	});
	
});




