import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const PdfViewer = ({ filepath }) => {

	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const onDocumentLoadSuccess = ({ numOfPages }) => {
		setNumPages(numPages);
		setPageNumber(1);
	}

	return (
		<div>
			<Document file={filepath} onLoadSuccess={onDocumentLoadSuccess}>
				<Page height="200" pageNumber={pageNumber}></Page>
			</Document>
		</div>
	);
}

export default PdfViewer;