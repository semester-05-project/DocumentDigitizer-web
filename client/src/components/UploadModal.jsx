import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import Alert from './Alert';
import url_config from '../url.config.json';
import Toast from './Toast';
// import { v4 as uuidv4 } from 'uuid';

// extension without the dot
const UploadModal = ({ id, title, fileInputClass, mimeType, extension, endpoint, endpoint2, color }) => {

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [url, setUrl] = useState(null);
    const [fileError, setFileError] = useState(null);
	const [err, setErr] = useState(null);
	const [loading, setLoading] = useState(false);

    const handleFileInput = (e, fileInputClass) => {
		// console.log(mimeType);
        const fileInput = document.querySelector("." + fileInputClass);
        fileInput.click();
    }

    useEffect(() => {
        if (file){
			setLoading(true);
            let fileName = file.name;
            if (fileName.length >= 12){
                let splitName = fileName.split('.');
                fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
            }
            uploadFile(fileName, endpoint, extension); 
        }
    }, [file]);

    const handleFileUpload = (event, mimeType, extension) => {
        const curr_file = event.target.files[0];

        if (curr_file && curr_file.type === mimeType){
            setFile(event.target.files[0]);
            setUrl("");
            setProgress(0);
            setFileError(null);
        }
        // else{
        //     setFileError(`Only .${extension} files are allowed`);
        // }
        
    }
    
    const uploadFile = async (fileName, endpoint, extension) => {
        const formData = new FormData();
        formData.append(extension, file);
        
        const config = {
            onUploadProgress: function(progressEvent){
                const percentCompleted = (progressEvent.loaded / progressEvent.total)*100;
                setProgress(percentCompleted);
                setLoaded(progressEvent.loaded);
            },
            responseType: "arraybuffer"
        }
        axios.post(`${url_config.SERVER_URL}/api/${endpoint}`, formData, config)
            .then(res => {
				setLoading(false);
				setErr(null);
                // console.log(res);
				let url = "";
				if (extension === 'pdf'){
					url = URL.createObjectURL(new Blob([res.data], { type: "application/zip" }));
				}
				else{
					url = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
				}
                setUrl(url);
            })
            .catch((err) => {
                if (err.code === "ERR_BAD_REQUEST"){
                    setErr("Network Error: Please try again later");
                    // window.location.reload();
                }
				else if (err.code === "ERR_CONNECTION_REFUSED"){
					// alert("Network Error: Please check your connection");
					setErr("Network Error: Please check your connection");
				}
				else{
					// alert(err.message);
					setErr(err.message);
					// window.location.reload();
				}
				
            });
    }

    return (
        <div className='modal fade' id={id} tabIndex="-1" aria-labelledby={`${id}label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {/* <div>
                        <button type='button' className="btn-close m-2 p-2" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div> */}
                    <div className="modal-body wrapper d-flex flex-column p-4">
                        <h3 className="lead text-center">{title}</h3>

						{err && <Alert message={err} />}

                        <form data-testid="upload-modal-form" className={`p-4 d-flex flex-column text-center justify-content-center rounded my-2 mb-4 needs-validation ${color}`} noValidate onClick={(e) => handleFileInput(e, fileInputClass)}>
                            <input data-testid={fileInputClass} type="file" placeholder={fileInputClass} name='file' hidden className={`form-control file-input ${fileInputClass} ${(fileError) ? "is-invalid" : ""}`} accept={mimeType} onChange={(e) => handleFileUpload(e, mimeType, extension)} />
                            <i className="fas fa-cloud-upload-alt fs-1"></i>
                            <p className='mt-4 lead'>Browse File to Upload</p>
                            <div className="invalid-feedback">
                                {fileError}
                            </div>
                        </form>

                        {/* Uploading */}
                        <section className={`progress-area ${color} p-3 rounded mb-2 ${(progress === 0 || progress === 100) ? "d-none" : ""}`}>
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

                        {/* Uploaded */}
                        <section className={`uploaded-area ${color} p-3 rounded mb-2 ${(progress === 100) ? "" : "d-none"}`}>
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

						<section className='text-center'>
							{!err && (progress === 100) && loading && <Spinner color="text-info" />}
						</section>
						

                        {/* Download */}
                        <section className={`uploaded-area ${color} p-3 rounded mb-2 ${(url) ? "" : "d-none"}`}>
                            <li className="row d-flex">
                                <div className="content d-flex col-11">
                                    <i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
                                    <div className="details col-11 d-flex flex-column ps-2">
                                        <small className="name">result &#8226; <a href={url} download="result">Download</a></small>
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
    );
}

export default UploadModal;