import UploadModal from './UploadModal';

const Convertor = () => {

    
    return (
        <div className='bg-light h-100 d-flex p-4 justify-content-center'>
            <div className="col-5 d-flex flex-column justify-content-center">
                <div className="card p-4 m-2 d-flex">
                    {/* Button trigger modal */}
                    <div className="card-body d-flex justify-content-center">
                        <button className='btn btn-outline-primary px-2' type='button' data-bs-toggle="modal" data-bs-target="#docxToPdf">DOCX to PDF</button>
                    </div>

                    {/* Modal */}
                    <UploadModal 
                        id="docxToPdf"
                        title="DOCX To PDF Convertor"
                        fileInputClass="docx-input"
                        mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        extension='docx'
                        endpoint='docxToPdfUpload'
                    />
                    
                </div>

                <div className="card p-4 m-2 d-flex">
                    <div className="card-body d-flex justify-content-center">
                        <button className='btn btn-outline-success px-2' type='button' data-bs-toggle="modal" data-bs-target="#xlsxToPdf">XLSX to PDF</button>
                    </div>

                    {/* Modal */}
                    <UploadModal 
                        id="xlsxToPdf"
                        title="XLSX To PDF Convertor"
                        fileInputClass="xlsx-input"
                        mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        extension='xlsx'
                        endpoint='xlsxToPdfUpload'
                    />
                </div>

                <div className="card p-4 m-2 d-flex">
                    <div className="card-body d-flex justify-content-center">
                        <button className='btn btn-outline-danger px-2' type='button'>PPTX to PDF</button>
                    </div>
                </div>

                <div className="card p-4 m-2 d-flex">
                    <div className="card-body d-flex justify-content-center">
                        <button className='btn btn-outline-secondary px-2' type='button'>IMG to PDF</button>
                    </div>
                </div>
            </div>

            <div className="col-5 d-flex flex-column justify-content-center">
                <div className="card p-4 m-2 d-flex">
                    <div className="card-body d-flex justify-content-center">
                        <button className='btn btn-outline-primary px-2' type='button'>PDF to DOCX</button>
                    </div>
                </div>

                <div className="card p-4 m-2 d-flex">
                    <div className="card-body d-flex justify-content-center">
                        <button className='btn btn-outline-success px-2' type='button'>PDF to XLSX</button>
                    </div>
                </div>

                <div className="card p-4 m-2 d-flex">
                    <div className="card-body d-flex justify-content-center">
                        <button className='btn btn-outline-danger px-2' type='button'>PDF to PPTX</button>
                    </div>
                </div>

                <div className="card p-4 m-2 d-flex">
                    <div className="card-body d-flex justify-content-center">
                        <button className='btn btn-outline-secondary px-2' type='button'>PDF to IMG</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Convertor;