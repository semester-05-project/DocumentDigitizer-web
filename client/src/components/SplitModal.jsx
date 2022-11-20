import React, { useState, useEffect } from 'react';
import { images } from '../javascript/imageImports';
import axios from 'axios';
import url_config from '../url.config.json';
import Spinner from './Spinner';
import Alert from './Alert';
import Toast from './Toast';

const SplitModal = () => {
	const [err, setErr] = useState(null);
	const [file, setFile] = useState(null);
	const [perc, setPerc] = useState(0);
	const [url, setUrl] = useState(null);
	const [loaded, setLoaded] = useState(0);
	const [loading, setLoading] = useState(false);
	const [resultFileName, setResultFileName] = useState("");
	const [pageCount, setPageCount] = useState(1);
	const [pageSize, setPageSize] = useState(500);

	const handleFileInput = (e) => {
		const input = e.target.parentElement.querySelector('.file-split-input');
		input.click();
	}

	const handleSplitByPages = () => {
		if (file){
			setLoading(true);
			const formData = new FormData();
			formData.append("file", file);
			formData.append('pageCount', pageCount);
			
			const config = {
				onUploadProgress: function(progressEvent){
					const percentCompleted = (progressEvent.loaded / progressEvent.total)*100;
					setPerc(percentCompleted);
					setLoaded(progressEvent.loaded);
				},
				responseType: "arraybuffer"
			}
			axios.post(`${url_config.SERVER_URL}/tools/split`, formData, config)
				.then(res => {
					console.log(res);
					let url = URL.createObjectURL(new Blob([res.data], { type: "application/zip" }));
					setLoading(false);
					setUrl(url);
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
		else{
			setErr("Select a file to split");
		}
	}

	const handleSplitBySize = () => {

	}

	const handleSetPageSize = (e) => {
		// calculate the size in bytes before setting the size
		setPageSize(e.target.value);
	}

	return (
		<div className="modal fade" id="splitModal" tabIndex="-1" aria-labelledby="splitModal" aria-hidden="true">
			<div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<img src={images.split} alt="split_icon" style={{height: "100px", width: "100px"}} />
						<h5 className="display-6">Split Pdf Files</h5>
						<button type="button" className="btn-close m-3" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<span className="description my-2">
							<ul>
								<li>Upload a PDF file you want to split and click run to get the split pdf files.</li>
								<li>Choose any option from the settings menu to get the kind of splitting you want.</li>
							</ul>
						</span>
						
						<div className="container container-fluid row col-12 mx-auto">

							{err && <Alert message={err} />}

							<div className="upload-section col-10 mx-auto">
								<div className="wrapper doc-upload d-flex flex-column p-4">
									<form className='p-4 d-flex flex-column text-center justify-content-center rounded my-2 mb-4 needs-validation' noValidate onClick={handleFileInput}>
										<input type="file" name='file' hidden accept='application/pdf' className={`file-split-input ${(err) ? "is-invalid" : ""}`} onChange={(e) => setFile(e.target.files[0])} />
										<i className="fas fa-cloud-upload-alt fs-1"></i>
										<p className='mt-4 lead'>Browse File to Upload</p>
									</form>

									<section className='text-center'>
										{!err && loading && <Spinner color="text-success" />}
									</section>

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

							<div className="settings-section col-10 mx-auto p-4 my-2">
								<div className="split-files card w-100 my-4">
									<div className="card-body">
										<h5 className="topic fs-5 mb-4">Split by pages</h5>

										<div className="form-floating mb-3">
											<input type="number" min="1" className="form-control" id="pageCount" placeholder='set page count per pdf' onChange={(e) => {setPageCount(e.target.value)}} />
											<label htmlFor="pageCount">Set page count per pdf</label>
										</div>

										<div className="btn-section d-flex flex-row">
											<button className='btn btn-outline-success mx-2 px-4 d-flex align-items-center' onClick={handleSplitByPages}>
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

								<div className="split-files card w-100 my-4">
									<div className="card-body">
										<h5 className="topic fs-5 mb-4">Split by size</h5>

										<div className="row">
											<div className="form-floating mb-3 col">
												<input type="number" min="1" step="0.1" className="form-control" id="pageCount" placeholder='set page count per pdf' onChange={handleSetPageSize} />
												<label htmlFor="pageCount">Set page size per pdf</label>
											</div>

											<div className="form-floating mb-3 col">
												<select className="form-select" id="sizeType" aria-label="Floating label select">
													<option value={1024} defaultValue>KB</option>
													<option value={1024*1024}>MB</option>
												</select>
												<label htmlFor="sizeType">KB/MB</label>
											</div>
										</div>
										

										<div className="btn-section d-flex flex-row">
											<button className='btn btn-outline-success mx-2 px-4 d-flex align-items-center' onClick={handleSplitBySize}>
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
						
					</div>
				</div>
				
			</div>
		</div>
	);
}

export default SplitModal;