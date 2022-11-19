import React from 'react';
import { images } from '../javascript/imageImports';
import UploadModal from './UploadModal';

const Convertors = () => {
	return (
		<>
			{/* <h2 className="title display-6 my-3 text-center">Convertors</h2> */}
			<div className="features-convertors col-12 d-flex flex-row flex-wrap justify-content-start">

				{/* Docx to pdf */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#docxToPdf">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body text-dark p-2 px-3">
									<img src={images.docx} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Docx to Pdf</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="docxToPdf"
					title="DOCX To PDF Convertor"
					fileInputClass="docx-input"
					mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
					extension='docx'
					endpoint='docxToPdfUpload'
					endpoint2='convertDocument'
					color='docx'
				/>

				{/* Doc to pdf */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#docToPdf">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.doc} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Doc to Pdf</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="docToPdf"
					title="DOC To PDF Convertor"
					fileInputClass="doc-to-pdf-input"
					mimeType='application/msword'
					extension='doc'
					endpoint='docToPdfUpload'
					endpoint2='convertDocument'
					color='docx'
				/>

				{/* Xlsx to pdf */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#xlsxToPdf">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.xlsx} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Xlsx to Pdf</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="xlsxToPdf"
					title="XLSX To PDF Convertor"
					fileInputClass="xlsx-input"
					mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					extension='xlsx'
					endpoint='xlsxToPdfUpload'
					endpoint2='convertDocument'
					color='xlsx'
				/>

				{/* Xls to pdf */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#xlsToPdf">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.xls} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Xls to Pdf</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="xlsToPdf"
					title="XLS To PDF Convertor"
					fileInputClass="xls-input"
					mimeType='application/vnd.ms-excel'
					extension='xls'
					endpoint='xlsToPdfUpload'
					endpoint2='convertDocument'
					color='xlsx'
				/>

				{/* Pptx to pdf */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#pptxToPdf">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.pptx} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Pptx to Pdf</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="pptxToPdf"
					title="PPTX To PDF Convertor"
					fileInputClass="pptx-input"
					mimeType='application/vnd.openxmlformats-officedocument.presentationml.presentation'
					extension='pptx'
					endpoint='pptxToPdfUpload'
					endpoint2='convertDocument'
					color='pptx'
				/>

				{/* Ppt to pdf */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#pptToPdf">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.ppt} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Ppt to Pdf</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="pptToPdf"
					title="PPT To PDF Convertor"
					fileInputClass="ppt-input"
					mimeType='application/vnd.ms-powerpoint'
					extension='ppt'
					endpoint='pptToPdfUpload'
					endpoint2='convertDocument'
					color='pptx'
				/>

				{/* Png to pdf */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#pngToPdf">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.png} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Png to Pdf</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="pngToPdf"
					title="PNG To PDF Convertor"
					fileInputClass="png-input"
					mimeType='image/png'
					extension='png'
					endpoint='pngToPdfUpload'
					endpoint2='convertDocument'
					color='png'
				/>

				{/* Jpg to pdf */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#jpgToPdf">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.jpg} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Jpg/Jpeg to Pdf</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="jpgToPdf"
					title="JPG/JPEG To PDF Convertor"
					fileInputClass="jpg-input"
					mimeType='image/jpeg'
					extension='jpg'
					endpoint='jpgToPdfUpload'
					endpoint2='convertDocument'
					color='jpg'
				/>

				{/* Webp to pdf */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#webpToPdf">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.webp} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Webp to Pdf</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="webpToPdf"
					title="WEBP To PDF Convertor"
					fileInputClass="webp-input"
					mimeType='image/webp'
					extension='webp'
					endpoint=''
					endpoint2='convertDocument'
					color='webp'
				/>

				{/* Pdf to Png */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#pdfToPng">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.pdf} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Pdf to Png</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="pdfToPng"
					title="PDF to PNG Convertor"
					fileInputClass="pdf-to-png-input"
					mimeType='application/pdf'
					extension='pdf'
					endpoint='pdfToPngUpload'
					endpoint2='convertDocument'
					color='pdf'
				/>

				{/* Pdf to Jpg */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#pdfToJpg">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.pdf} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Pdf to Jpg</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="pdfToJpg"
					title="PDF to JPG Convertor"
					fileInputClass="pdf-to-jpg-input"
					mimeType='application/pdf'
					extension='pdf'
					endpoint='pdfToJpgUpload'
					endpoint2='convertDocument'
					color='pdf'
				/>

				{/* Pdf to Webp */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#pdfToWebp">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.pdf} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Pdf to Webp</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="pdfToWebp"
					title="PDF to WEBP Convertor"
					fileInputClass="pdf-to-webp-input"
					mimeType='application/pdf'
					extension='pdf'
					endpoint='pdfToWebpUpload'
					endpoint2='convertDocument'
					color='pdf'
				/>

				{/* Pdf to html */}
				<div className="convertor m-3" data-bs-toggle="modal" data-bs-target="#pdfToHTML">
					<div className="card d-flex flex-row">
						<div className="card-body d-flex align-items-center">
							<div className="card">
								<div className="card-body p-2 px-3">
									<img src={images.html} />
								</div>
							</div>
							<span className='convertor-type ms-2 fw-bold'>Pdf to HTML</span>
						</div>
					</div>
				</div>

				{/* Modal */}
				<UploadModal 
					id="pdfToHTML"
					title="PDF to HTML Convertor"
					fileInputClass="pdf-to-html-input"
					mimeType='application/pdf'
					extension='pdf'
					endpoint=''
					endpoint2='convertDocument'
					color='pdf'
				/>


			</div>
		</>
		
	);
}

export default Convertors;