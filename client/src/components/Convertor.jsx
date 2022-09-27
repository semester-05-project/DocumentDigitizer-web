import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convertor = () => {

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(0);

    const handleFileInput = (e) => {
        const fileInput = document.querySelector('.convert-input');
        fileInput.click();
    }

    useEffect(() => {
        if (file){
            let fileName = file.name;
            if (fileName.length >= 12){
                let splitName = fileName.split('.');
                fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
            }
            uploadFile(fileName);  
        }
    }, [file]);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    }
    const uploadFile = async (name) => {
        const formData = new FormData()
        formData.append('doc', file);
        
        const config = {
            onUploadProgress: function(progressEvent){
                const percentCompleted = (progressEvent.loaded / progressEvent.total)*100;
                setProgress(percentCompleted);
                setLoaded(progressEvent.loaded);
            }
        }
        axios.post("http://localhost:4000/api/docToPdfUpload", formData, config)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
    
    return (
        <div className='bg-light h-100 d-flex p-4 justify-content-center'>
            <div className="col-5 d-flex flex-column justify-content-center">
                <div className="card p-4 m-2 d-flex">
                    {/* Button trigger modal */}
                    <div className="card-body d-flex justify-content-center">
                        <button className='btn btn-outline-primary px-2' type='button' data-bs-toggle="modal" data-bs-target="#docxToPdf">DOCX to PDF</button>
                    </div>

                    {/* Modal */}
                    <div className='modal fade' id='docxToPdf' tabIndex="-1" aria-labelledby='docxToPdfLabel' aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                {/* <div>
                                    <button type='button' className="btn-close m-2 p-2" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div> */}
                                <div className="modal-body wrapper d-flex flex-column p-4">
                                    <h3 className="lead text-center">DOCS to PDF Converter</h3>
                                    <form action="#" className='p-4 d-flex flex-column text-center justify-content-center rounded my-2 mb-4' onClick={(e) => handleFileInput(e)}>
                                        <input type="file" name='file' hidden className="file-input convert-input" onChange={handleFileUpload} />
                                        <i className="fas fa-cloud-upload-alt fs-1"></i>
                                        <p className='mt-4 lead'>Browse File to Upload</p>
                                    </form>
                                    <section className={`progress-area p-3 rounded mb-2 ${(progress === 0 || progress === 100) ? "d-none" : ""}`}>
                                        <li className="row d-flex">
                                            <i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
                                            <div className="content col-11 px-3">
                                                <div className="details d-flex justify-content-between">
                                                    <small className="name">{file && file.name} &#8226; Uploading</small>
                                                    <small className="percent">{progress.toFixed(2) + "%"}</small>
                                                </div>
                                                <div className="progress-bar rounded-pill bg-white">
                                                    <div className="progress" style={{width: `${progress}%`}}></div>
                                                </div>
                                            </div>
                                        </li>
                                    </section>
                                    <section className={`uploaded-area p-3 rounded mb-2 ${(progress === 100) ? "" : "d-none"}`}>
                                        <li className="row d-flex">
                                            <div className="content d-flex col-11">
                                                <i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
                                                <div className="details col-11 d-flex flex-column ps-2">
                                                    <small className="name">{file && file.name} &#8226; Uploaded</small>
                                                    <small className="size fw-4">{file && (file.size/1024 < 1024) ? (file.size / 1024).toFixed(2) + " KB" : (loaded / (1024*1024)).toFixed(2) + " MB"}</small>
                                                </div>
                                            </div>
                                            <i className="fas fa-check col-1 fs-4 p-0 align-self-center text-center"></i>
                                        </li>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card p-4 m-2 d-flex">
                    <div className="card-body d-flex justify-content-center">
                        <button className='btn btn-outline-success px-2' type='button'>XLSX to PDF</button>
                    </div>
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