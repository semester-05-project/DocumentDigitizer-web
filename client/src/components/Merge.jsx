import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Merge = () => {
	const [files, setFiles] = useState(null);
	const [fileSize, setFileSize] = useState(0);
	const [resultSize, setResultSize] = useState(0);
    const [perc, setPerc] = useState(0);
	const [err, setErr] = useState("");
	const [loaded, setLoaded] = useState(0);
	const [url, setUrl] = useState(null);

	const handlePdfInput = (e) => {
		const input = document.querySelector('.pdf-input');
		input.click();
	}

	const handlePdfUpload = (e) => {
		if (e.target.files.length !== 2){
			setErr("Select two pdf files to merge");
			return false;
		}
		if (e.target.files[0].type === 'application/pdf' && e.target.files[1].type === 'application/pdf'){
			setFiles(e.target.files);
			setFileSize(e.target.files[0].size + e.target.files[1].size);
			setErr("");
			setUrl(null);
			return true;
		}
		else{
			setErr("Only .pdf files are allowed");
			return false;
		}
		
	}

	const uploadFiles = async (files) => {
        const formData = new FormData();
		for (let i = 0; i < files.length; i++){
			formData.append('files', files[i]);
		}
        
        const config = {
            onUploadProgress: function(progressEvent){
                const percentCompleted = (progressEvent.loaded / progressEvent.total)*100;
                setPerc(percentCompleted);
                setLoaded(progressEvent.loaded);
            },
            responseType: "arraybuffer"
        }
        axios.post(`http://localhost:4000/tools/merge`, formData, config)
            .then(res => {
				let url = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
                setUrl(url);
				setResultSize(res.headers['content-length']);
            })
            .catch((err) => {
				console.log(err);
                if (err.code === "ERR_BAD_REQUEST"){
                    alert("Network Error: Please try again later");
                    window.location.reload();
                }
				else{
					alert(err.message);
					window.location.reload();
				}
            });
    }

	const handleSubmit = (e) => {
		e.preventDefault();

		if (files && err === ""){
			uploadFiles(files);
		}
	}

	return (
		<div className='bg-light h-100 d-flex p-4 justify-content-center'>
			<div className='bg-light h-100 d-flex p-4 justify-content-center row'>
				<div className="card-body d-flex flex-column text-center justify-content-center col-10 p-0">
					<h3 className='lead p-3 m-0 border'>Select files from your computer to merge</h3>
				</div>

				<div className="upload-container col-12 row p-0 justify-content-center">

					<div className="wrapper doc-upload d-flex flex-column p-4 col-10">
						{/* file input */}
						<form action="#" className='p-4 d-flex flex-column text-center justify-content-center rounded my-2 needs-validation' noValidate onClick={handlePdfInput}>
							<input type="file" name='file' hidden className={`pdf-input ${(err ? "is-invalid" : "")}`} onChange={handlePdfUpload} multiple />
							<i className="fas fa-cloud-upload-alt fs-1"></i>
							<p className='mt-4 lead'>Upload two pdf files in the order of merging</p>
							<div className="invalid-feedback">
                                {err}
                            </div>
						</form>
						{/* uploading area */}
						<section className={`progress-area p-3 rounded mb-2 ${(perc === 0 || perc === 100) ? "d-none" : ""}`}>
							<li className="row d-flex">
								<i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
								<div className="content col-11 px-3">
									<div className="details d-flex justify-content-between">
										<small className="name">Uploading...</small>
										<small className="percent">{perc.toFixed(2) + "%"}</small>
									</div>
									<div className="progress-bar rounded-pill bg-white">
										<div className="progress" style={{width: `${perc}%`}}></div>
									</div>
								</div>
							</li>
						</section>
						{/* uploaded area */}
						<section className={`uploaded-area p-3 rounded mb-2 ${(files) ? "" : "d-none"}`}>
							<li className="row d-flex">
								<div className="content d-flex col-11">
									<i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
									<div className="details col-11 d-flex flex-column ps-2">
										<small className='file-one'>File 1 - {files && files[0].name}</small>
										<small className='file-two'>File 2 - {files && files[1].name}</small>
										<small className="name"><b>Uploaded</b></small>
										<small className="size fw-4">{(fileSize/1024 < 1024) ? (fileSize / 1024).toFixed(2) + " KB" : (fileSize / (1024*1024)).toFixed(2) + " MB"}</small>
									</div>
								</div>
								<i className="fas fa-check col-1 fs-4 p-0 align-self-center text-center"></i>
							</li>
						</section>
						{/* Download */}
						<section className={`uploaded-area xlsx p-3 rounded mb-2 ${(url) ? "" : "d-none"}`}>
							<li className="row d-flex">
								<div className="content d-flex col-11">
									<i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
									<div className="details col-11 d-flex flex-column ps-2">
										<small className="name">result &#8226; <a href={url} download="result">Download</a></small>
										<small className="size fw-4">{(resultSize/1024 < 1024) ? (resultSize / 1024).toFixed(2) + " KB" : (resultSize / (1024*1024)).toFixed(2) + " MB"}</small>
									</div>
								</div>
								<i className="fas fa-check col-1 fs-4 p-0 align-self-center text-center"></i>
							</li>
						</section>
					</div>

					<button className="btn btn-info col-10" onClick={handleSubmit}>MERGE</button>
				
				</div>
			</div>
		</div>
	);
}

export default Merge;