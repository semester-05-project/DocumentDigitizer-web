import React from 'react';
import { images } from '../javascript/imageImports';
import MergeModal from './MergeModal';
import OCRModal from './OCRModal';
import SplitModal from './SplitModal';
import RemovePageModal from './RemovePageModal';
import AddPageModal from './AddPageModal';

const Tools = () => {
	return (
		<div className='features-tools col-12 d-flex flex-row flex-wrap justify-content-start'>
			<div data-testid="tool-card" className="tool-card card p-3 m-2" data-bs-toggle="modal" data-bs-target="#mergeModal">
				<div className="card-body">
					<img src={images.merge_icon} alt="merge_icon" />
					<span className='ms-4 fw-bold'>Merge Files</span>
					<p className='my-3'>Merge multiple documents into one PDF file</p>
				</div>
			</div>
			<MergeModal />

			<div data-testid="tool-card" className="tool-card card p-3 m-2" data-bs-toggle="modal" data-bs-target="#ocrModal">
				<div className="card-body">
					<img src={images.ocr} alt="ocr_icon" />
					<span className='ms-4 fw-bold'>OCR</span>
					<p className='my-3'>Optical Character Recognition for your images with text</p>
				</div>
			</div>
			<OCRModal />

			<div data-testid="tool-card" className="tool-card card p-3 m-2" data-bs-toggle="modal" data-bs-target="#splitModal">
				<div className="card-body">
					<img src={images.split} alt="split_icon" />
					<span className='ms-4 fw-bold'>Split Files</span>
					<p className='my-3'>Split pdf files into multiple files</p>
				</div>
			</div>
			<SplitModal />

			<div data-testid="tool-card" className="tool-card card p-3 m-2" data-bs-toggle="modal" data-bs-target="#addPageModal">
				<div className="card-body">
					<img src={images.add} alt="add_icon" />
					<span className='ms-4 fw-bold'>Add Pages</span>
					<p className='my-3'>Insert additional pages to an existing pdf file</p>
				</div>
			</div>
			<AddPageModal />

			<div data-testid="tool-card" className="tool-card card p-3 m-2" data-bs-toggle="modal" data-bs-target="#removeModal">
				<div className="card-body">
					<img src={images.delete_file} alt="remove_icon" />
					<span className='ms-4 fw-bold'>Remove Pages</span>
					<p className='my-3'>Remove pages from an existing pdf file</p>
				</div>
			</div>
			<RemovePageModal />
			
		</div>
	);
}

export default Tools;