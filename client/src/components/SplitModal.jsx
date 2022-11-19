import React, { useState, useEffect } from 'react';
import { images } from '../javascript/imageImports';
import axios from 'axios';

const SplitModal = () => {
	const [err, setErr] = useState(null);
	const [file, setFile] = useState(null);
	const [perc, setPerc] = useState(0);
	const [url, setUrl] = useState(null);
	const [loaded, setLoaded] = useState(0);

	const handleFileInput = (e) => {
		const input = e.target.parentElement.querySelector('.file-split-input');
		input.click();
	}

	const handleSplit = () => {
		if (file){
			const formData = new FormData();
			formData.append("files", file);
			
			const config = {
				onUploadProgress: function(progressEvent){
					const percentCompleted = (progressEvent.loaded / progressEvent.total)*100;
					setPerc(percentCompleted);
					setLoaded(progressEvent.loaded);
				},
				responseType: "arraybuffer"
			}
			axios.post(`http://localhost:4000/tools/split`, formData, config)
				.then(res => {
					console.log(res);
					let url = URL.createObjectURL(new Blob([res.data], { type: "application/zip" }));
					setUrl(url);
				})
				.catch((err) => {
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
		else{
			alert("Select a file to split");
		}
	}

	return (
		<div className="modal fade" id="splitModal" tabIndex="-1" aria-labelledby="splitModal" aria-hidden="true">
			<div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-body">
						<button type="button" className="btn-close m-3" data-bs-dismiss="modal" aria-label="Close"></button>
						
						<div className="container container-fluid row col-12 mx-auto">

							<div className="upload-section col-10 col-md-4">
								<div className="wrapper doc-upload d-flex flex-column p-4">
									<form className='p-4 d-flex flex-column text-center justify-content-center rounded my-2 mb-4 needs-validation' noValidate onClick={handleFileInput}>
										<input type="file" name='file' hidden accept='application/pdf' className={`file-split-input ${(err) ? "is-invalid" : ""}`} onChange={(e) => setFile(e.target.files[0])} />
										<i className="fas fa-cloud-upload-alt fs-1"></i>
										<p className='mt-4 lead'>Browse a File to Split</p>
										<div className="invalid-feedback">
											{err}
										</div>
									</form>

									<section className={`uploaded-area p-3 rounded mb-2 ${(file) ? "" : "d-none"}`}>
										<li className="row d-flex">
											<div className="content d-flex col-11">
												<i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
												<div className="details col-11 d-flex flex-column ps-2">
													<small className="name">{file && file.name} &#8226; Uploaded</small>
													<small className="size fw-4">{file && ((file.size/1024 < 1024) ? (file.size / 1024).toFixed(2) + " KB" : (file.size / (1024*1024)).toFixed(2) + " MB")}</small>
												</div>
											</div>
											<i className="fas fa-check col-1 fs-4 p-0 align-self-center text-center"></i>
										</li>
									</section>

								</div>
							</div>

							<div className="settings-section col-10 col-md-8 p-4 my-2">
								<div className="split-files card w-100">
									<div className="card-body">
										<h5 className="topic fs-5 mb-3">Split by pages</h5>
										<button className='btn btn-outline-success mx-2 px-4 d-flex align-items-center' onClick={handleSplit}>
											<span>Run</span>
											<img src={images.play} alt="" className='ms-2 img-fluid' style={{width: "20px", height: "20px"}}/>
										</button>

										{url && 
										<a href={url} className="text-decoration-none" download>
											<button className='btn btn-outline-success mx-2 px-4 d-flex align-items-center'>
												<span>Download</span>
												<img src={images.download} alt="" className='ms-2 img-fluid' style={{width: "20px", height: "20px"}}/>
											</button>
										</a>
										}
									</div>
								</div>
							</div>

						</div>
						
					</div>
				</div>
				
			</div>
		</div>
	);
}

export default SplitModal;