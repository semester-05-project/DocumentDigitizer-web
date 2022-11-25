import React, { useState, useEffect } from 'react';
import { images } from '../javascript/imageImports';
import url_config from '../url.config.json';
import axios from 'axios';
import Spinner from './Spinner';
import Alert from './Alert';
import Toast from './Toast';

const OCRModal = () => {
	const [err, setErr] = useState("");
	const [doc, setDoc] = useState(null);
	const [perc, setPerc] = useState(0);
	const [url, setUrl] = useState(null);
	const [loaded, setLoaded] = useState(0);
	const [loading, setLoading] = useState(false);
	const [text, setText] = useState("No text yet");
	const [resultFileName, setResultFileName] = useState("");

	useEffect(() => {
        if (doc){
            let fileName = doc.name;
            if (fileName.length >= 12){
                let splitName = fileName.split('.');
                fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
            }
            uploadFile();  
        }
    }, [doc]);


	const handleDocInput = (e) => {
		const input = e.target.parentElement.querySelector('.doc-ocr-input');
		input.click();
	}
	
	const handleDocUpload = (e) => {
		// console.log(e.target);
        const curr_file = e.target.files[0];

        if (curr_file && curr_file.type === 'image/png' || curr_file.type === 'image/jpeg' || curr_file.type === 'application/pdf'){
            setDoc(e.target.files[0]);
            setUrl("");
            setPerc(0);
            setErr(null);
        }
        else{
            setErr(`File type error`);
        }
	}

	const uploadFile = () => {
		const formData = new FormData();
        formData.append("file", doc);
		setLoading(true);
		setErr(null);
        
        const config = {
            onUploadProgress: function(progressEvent){
                const percentCompleted = (progressEvent.loaded / progressEvent.total)*100;
                setPerc(percentCompleted);
                setLoaded(progressEvent.loaded);
            },
            responseType: "arraybuffer"
        }
        axios.post(`${url_config.SERVER_URL}/tools/ocr`, formData, config)
            .then(res => {
				let url = URL.createObjectURL(new Blob([res.data], { type: "text/plain" }));
				setLoading(false);
                setUrl(url);

				if (!("TextDecoder" in window)){
					alert("Sorry, this browser does not support TextDecoder...");
				}

				const enc = new TextDecoder("utf-8");
				const text = enc.decode(res.data);
				setText(text);
            })
            .catch((err) => {
                if (err.code === "ERR_BAD_REQUEST"){
					setErr("Network Error: Please try again later");
                }
				else{
					setErr(err.message);
				}
				
            });
	}

	return (
		<div data-testid="ocr-modal" className="modal fade" id="ocrModal" tabIndex="-1" aria-labelledby="ocrModal" aria-hidden="true">
			<div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<img src={images.ocr} alt="ocr_icon" style={{height: "100px", width: "100px"}} />
						<h5 className="display-6">Optical Character Recognition</h5>
						<button type="button" className="btn-close m-3" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<span className="description my-2">
							<ul>
								<li>Tesseract.js is used for the optical character recognition of images here.</li>
								<li>Upload an image with text to extract the text content of the image.</li>
								<li>Download a text file containing the text extracted from the image</li>
							</ul>
						</span>
						
						<div className="container container-fluid row col-12 mx-auto">

							<div className="upload-section col-10 mx-auto">

								{err && <Alert message={err} />}

								<div className="wrapper doc-upload d-flex flex-column p-4">
									<form className='p-4 d-flex flex-column text-center justify-content-center rounded my-2 mb-4 needs-validation' noValidate onClick={handleDocInput}>
										<input type="file" name='file' hidden accept='image/png, image/jpeg' className={`doc-ocr-input ${(err) ? "is-invalid" : ""}`} onChange={handleDocUpload} />
										<i className="fas fa-cloud-upload-alt fs-1"></i>
										<p className='mt-4 lead'>Browse File to Upload</p>
									</form>
									<section className={`progress-area p-3 rounded mb-2 ${(perc === 0 || perc === 100) ? "d-none" : ""}`}>
										<li className="row d-flex">
											<i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
											<div className="content col-11 px-3">
												<div className="details d-flex justify-content-between">
													<small className="name">{doc && doc.name} &#8226; Uploading</small>
													<small className="percent">{perc.toFixed(2) + "%"}</small>
												</div>
												<div className="progress-bar rounded-pill bg-white">
													<div className="progress" style={{width: `${perc}%`}}></div>
												</div>
											</div>
										</li>
									</section>
									<section className={`uploaded-area p-3 rounded mb-2 ${(perc === 100) ? "" : "d-none"}`}>
										<li className="row d-flex">
											<div className="content d-flex col-11">
												<i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
												<div className="details col-11 d-flex flex-column ps-2">
													<small className="name">{doc && doc.name} &#8226; Uploaded</small>
													<small className="size fw-4">{doc && ((loaded/1024 < 1024) ? (loaded / 1024).toFixed(2) + " KB" : (loaded / (1024*1024)).toFixed(2) + " MB")}</small>
												</div>
											</div>
											<i className="fas fa-check col-1 fs-4 p-0 align-self-center text-center"></i>
										</li>
									</section>

									<section className='text-center'>
										{!err && loading && <Spinner color="text-success" />}
									</section>

									{/* Download */}
									{!err && !loading && <section className={`uploaded-area p-3 rounded mb-2 ${(url) ? "" : "d-none"}`}>
										<li className="row d-flex">
											<div className="content d-flex col-11">
												<i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
												<div className="details col-11 d-flex flex-column ps-2">
													<small className="name">result &#8226; 
														<a href={url} download={resultFileName}>Download</a>
													</small>
													<small className="size fw-4">{doc && (doc.size/1024 < 1024) ? (doc.size / 1024).toFixed(2) + " KB" : (loaded / (1024*1024)).toFixed(2) + " MB"}</small>
												</div>
											</div>
											<i className="fas fa-check col-1 fs-4 p-0 align-self-center text-center"></i>
										</li>
									</section>}

									<div className="output-settings card m-3 mx-auto w-100">
										<div className="card-body">
											<h5 className="topic fs-5 mb-4">Output Settings</h5>
											<div className="form-floating mb-3">
												<input type="text" className="form-control" id="resultFileName" placeholder='result file name' onChange={(e) => {setResultFileName(e.target.value)}} />
												<label htmlFor="resultFileName">Set result file name</label>
											</div>
										</div>
									</div>
									
								</div>
							</div>

							<div className="options-section col-10 p-4 mx-auto">
								<h5 className="display-6 my-3">Text Extracted from the Image</h5>
								<textarea className='ocr-text form-control' name="ocr-text" id="ocr-text" cols="50" rows="20" value={text} disabled></textarea>
							</div>

						</div>
						
					</div>
				</div>
				
			</div>
		</div>
	);
}

export default OCRModal;