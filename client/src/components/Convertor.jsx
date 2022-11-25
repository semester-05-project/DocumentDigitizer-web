// import UploadModal from './UploadModal';

// const Convertor = () => {

    
//     return (
//         <div className='bg-light h-100 d-flex p-4 justify-content-center'>
//             <div className="col-5 d-flex flex-column justify-content-center">
//                 <div className="card p-4 m-2 d-flex">
//                     {/* Button trigger modal */}
//                     <div className="card-body d-flex justify-content-center">
//                         <button className='btn btn-outline-primary px-2' type='button' data-bs-toggle="modal" data-bs-target="#docxToPdf">DOCX to PDF</button>
//                     </div>

//                     {/* Modal */}
//                     <UploadModal 
//                         id="docxToPdf"
//                         title="DOCX To PDF Convertor"
//                         fileInputClass="docx-input"
//                         mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//                         extension='docx'
//                         endpoint='docxToPdfUpload'
// 						color='docx'
//                     />
                    
//                 </div>

//                 <div className="card p-4 m-2 d-flex">
//                     <div className="card-body d-flex justify-content-center">
//                         <button className='btn btn-outline-success px-2' type='button' data-bs-toggle="modal" data-bs-target="#xlsxToPdf">XLSX to PDF</button>
//                     </div>

//                     {/* Modal */}
//                     <UploadModal 
//                         id="xlsxToPdf"
//                         title="XLSX To PDF Convertor"
//                         fileInputClass="xlsx-input"
//                         mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//                         extension='xlsx'
//                         endpoint='xlsxToPdfUpload'
// 						color='xlsx'
//                     />
//                 </div>

//                 <div className="card p-4 m-2 d-flex">
//                     <div className="card-body d-flex justify-content-center">
//                         <button className='btn btn-outline-danger px-2' type='button' data-bs-toggle="modal" data-bs-target="#pptxToPdf">PPTX to PDF</button>
//                     </div>

// 					{/* Modal */}
//                     <UploadModal 
//                         id="pptxToPdf"
//                         title="PPTX To PDF Convertor"
//                         fileInputClass="pptx-input"
//                         mimeType='application/vnd.openxmlformats-officedocument.presentationml.presentation'
//                         extension='pptx'
//                         endpoint='pptxToPdfUpload'
// 						color='pptx'
//                     />
//                 </div>

//                 <div className="card p-4 m-2 d-flex">
//                     <div className="card-body d-flex justify-content-center">
//                         <button className='btn btn-outline-secondary px-2' type='button' data-bs-toggle="modal" data-bs-target="#pngToPdf">PNG to PDF</button>
//                     </div>

// 					{/* Modal */}
//                     <UploadModal 
//                         id="pngToPdf"
//                         title="PNG To PDF Convertor"
//                         fileInputClass="img-png-input"
//                         mimeType='image/png'
//                         extension='png'
//                         endpoint='pngToPdfUpload'
// 						color='png'
//                     />
//                 </div>
//             </div>

//             <div className="col-5 d-flex flex-column justify-content-center">
//                 <div className="card p-4 m-2 d-flex">
//                     <div className="card-body d-flex justify-content-center">
//                         <button className='btn btn-outline-primary px-2' type='button' data-bs-toggle="modal" data-bs-target="#pdfToJpg">PDF to JPG</button>
//                     </div>

// 					{/* Modal */}
//                     <UploadModal 
//                         id="pdfToJpg"
//                         title="PDF To JPG Convertor"
//                         fileInputClass="pdf-jpg-input"
//                         mimeType='application/pdf'
//                         extension='pdf'
//                         endpoint='pdfToJpgUpload'
// 						color='docx'
//                     />
//                 </div>

//                 <div className="card p-4 m-2 d-flex">
//                     <div className="card-body d-flex justify-content-center">
//                         <button className='btn btn-outline-success px-2' type='button' data-bs-toggle="modal" data-bs-target="#pdfToPng">PDF to PNG</button>
//                     </div>

// 					{/* Modal */}
//                     <UploadModal 
//                         id="pdfToPng"
//                         title="PDF To PNG Convertor"
//                         fileInputClass="pdf-png-input"
//                         mimeType='application/pdf'
//                         extension='pdf'
//                         endpoint='pdfToPngUpload'
// 						color='xlsx'
//                     />
//                 </div>

//                 <div className="card p-4 m-2 d-flex">
//                     <div className="card-body d-flex justify-content-center">
//                         <button className='btn btn-outline-danger px-2' type='button' data-bs-toggle="modal" data-bs-target="#pdfToWebp">PDF to WEBP</button>
//                     </div>

// 					{/* Modal */}
//                     <UploadModal 
//                         id="pdfToWebp"
//                         title="PDF To WEBP Convertor"
//                         fileInputClass="pdf-webp-input"
//                         mimeType='application/pdf'
//                         extension='pdf'
//                         endpoint='pdfToWebpUpload'
// 						color='pptx'
//                     />
//                 </div>

//                 <div className="card p-4 m-2 d-flex">
//                     <div className="card-body d-flex justify-content-center">
//                         <button className='btn btn-outline-secondary px-2' type='button' data-bs-toggle="modal" data-bs-target="#jpgToPdf">JPG to PDF</button>
//                     </div>

// 					{/* Modal */}
//                     <UploadModal 
//                         id="jpgToPdf"
//                         title="JPG To PDF Convertor"
//                         fileInputClass="img-jpg-input"
//                         mimeType='image/jpeg'
//                         extension='jpg'
//                         endpoint='jpgToPdfUpload'
// 						color='jpg'
//                     />
//                 </div>
//             </div>
            
//         </div>
//     )
// }

// export default Convertor;