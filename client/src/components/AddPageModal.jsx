import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { images } from '../javascript/imageImports';
import Spinner from './Spinner';
import Alert from './Alert';

const AddPageModal = () => {
	const [fileErr, setFileErr] = useState(null);
	const [pageErr, setPageErr] = useState(null);
	const [err, setErr] = useState(null);
	const [file, setFile] = useState(null);
	const [addPages, setAddPages] = useState(null);
	const [resultFileName, setResultFileName] = useState("");
	const [url, setUrl] = useState(null);
	const [pages, setPages] = useState(0);
	const [fileLoading, setFileLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [index, setIndex] = useState(0);
	const [blankIndex, setBlankIndex] = useState(0);
	const [perc, setPerc] = useState(0);
	const [loaded, setLoaded] = useState(0);

	useEffect(() => {
		if (file && addPages){
			setErr(null);
		}
		setUrl(null);
	}, [file, addPages]);

	const handleFileInput = (e) => {
		e.target.parentElement.querySelector('.file-add-input').click();
	}

	const handlePageInput = (e) => {
		e.target.parentElement.querySelector('.page-add-input').click();
	}

	const handleGetFileData = (e) => {
		setFile(e.target.files[0]);
		setFileLoading(true);
		setFileErr(null);

		const formData = new FormData();
        formData.append("file", e.target.files[0]);
        
        axios.post(`http://localhost:4000/tools/getPdfData`, formData)
            .then(res => {
				setFileLoading(false);
				setFileErr(null);
				setPages(res.data.pages);
                // console.log(res);
            })
            .catch((err) => {
                if (err.code === "ERR_BAD_REQUEST"){
                    setFileErr("Network Error: Please try again later");
                }
				else if (err.code === "ERR_CONNECTION_REFUSED"){
					setFileErr("Network Error: Please check your connection");
				}
				else{
					setFileErr(err.message);
				}
				
            });
	}

	const handleAdd = () => {
		if (file && addPages){
			setErr(null);
			uploadFiles();
		}
		else{
			setErr("You must have the source file and pages file to continue");
		}
	}

	const uploadFiles = () => {

		setLoading(true);

		const formData = new FormData();
        formData.append("files", file);
		formData.append('files', addPages);
		formData.append('index', index);
		formData.append('blankIndex', blankIndex);

		const config = {
			onUploadProgress: function(progressEvent){
				const percentCompleted = (progressEvent.loaded / progressEvent.total)*100;
				setPerc(percentCompleted);
				setLoaded(progressEvent.loaded);
			},
			responseType: "arraybuffer"
		}
        
        axios.post(`https://document-digitizer-backend.onrender.com/tools/addPages`, formData, config)
            .then(res => {
				setLoading(false);
				setErr(null);
                console.log(res);

				let url = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
				setUrl(url);
            })
            .catch((err) => {
                if (err.code === "ERR_BAD_REQUEST"){
                    setErr("Network Error: Please try again later");
                }
				else if (err.code === "ERR_CONNECTION_REFUSED"){
					setErr("Network Error: Please check your connection");
				}
				else{
					setErr(err.message);
				}
				
            });
	}

	return (
		<div className="modal fade" id="addPageModal" tabIndex="-1" aria-labelledby="addPageModal" aria-hidden="true">
			<div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-body">
						<button type="button" className="btn-close m-3" data-bs-dismiss="modal" aria-label="Close"></button>
						
						<div className="container container-fluid row col-12 mx-auto">

							<div className="upload-section source-pdf col-10 col-md-6">
								<div className="wrapper doc-upload d-flex flex-column p-4">
									<form className='p-4 d-flex flex-column text-center justify-content-center rounded my-2 mb-4 needs-validation' noValidate onClick={handleFileInput}>
										<input type="file" name='file' hidden accept='application/pdf' className="file-add-input" onChange={handleGetFileData} />
										<i className="fas fa-cloud-upload-alt fs-1"></i>
										<p className='mt-4 lead'>Browse a source file</p>
									</form>

									<section className='text-center'>
										{!fileErr && fileLoading && <Spinner color="text-success" />}
									</section>

									{!fileLoading && <section className={`uploaded-area p-3 rounded mb-2 ${(file) ? "" : "d-none"}`}>
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
									</section>}

								</div>
							</div>

							<div className="upload-section add-pages col-10 col-md-6">
								<div className="wrapper doc-upload d-flex flex-column p-4">
									<form className='p-4 d-flex flex-column text-center justify-content-center rounded my-2 mb-4 needs-validation' noValidate onClick={handlePageInput}>
										<input type="file" name='file' hidden accept='application/pdf' className="page-add-input" onChange={(e) => setAddPages(e.target.files[0])} />
										<i className="fas fa-cloud-upload-alt fs-1"></i>
										<p className='mt-4 lead'>Browse pages file</p>
									</form>

									<section className={`uploaded-area p-3 rounded mb-2 ${(addPages) ? "" : "d-none"}`}>
										<li className="row d-flex">
											<div className="content d-flex col-11">
												<i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
												<div className="details col-11 d-flex flex-column ps-2">
													<small className="name">{addPages && addPages.name} &#8226; Uploaded</small>
													<small className="size fw-4">{addPages && ((addPages.size/1024 < 1024) ? (addPages.size / 1024).toFixed(2) + " KB" : (addPages.size / (1024*1024)).toFixed(2) + " MB")}</small>
												</div>
											</div>
											<i className="fas fa-check col-1 fs-4 p-0 align-self-center text-center"></i>
										</li>
									</section>

								</div>
							</div>

						</div>

						<div className="alert-section row col-10 p-4 mx-auto">
							{err && <Alert message={err} />}
						</div>

						<div className="settings-section row col-10 p-4 my-2 mx-auto">
							<div className="add-pages card w-100 mb-3">
								<div className="card-body">
									<h5 className="topic fs-5 mb-4">Page Add Settings</h5>

									<div className="form-floating mb-3">
										<input type="number" max={pages} min={0} className="form-control" id="pageIndex" placeholder='page index to insert the pages' onChange={(e) => {setIndex(e.target.value)}} value={index} />
										<label htmlFor="pageIndex">Set the page index to insert the pages</label>
									</div>

									<div className="form-floating mb-3">
										<input type="number" max={pages} min={0} className="form-control" id="blankPageIndex" placeholder='Set the page index to insert a blank page' onChange={(e) => {setBlankIndex(e.target.value)}} value={blankIndex} />
										<label htmlFor="blankPageIndex">Set the page index to insert a blank page</label>
									</div>

								</div>
							</div>

							<div className="output-settings card w-100 mb-3">
								<div className="card-body">
									<h5 className="topic fs-5 mb-4">Output Settings</h5>
									<div className="form-floating mb-3">
										<input type="text" className="form-control" id="resultFileName" placeholder='result file name' onChange={(e) => {setResultFileName(e.target.value)}} />
										<label htmlFor="resultFileName">Set result file name</label>
									</div>
								</div>
							</div>

							{/* Uploading */}
							<section className={`progress-area p-3 rounded mb-2 ${(perc === 0 || perc === 100) ? "d-none" : ""}`}>
								<li className="row d-flex">
									<i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
									<div className="content col-11 px-3">
										<div className="details d-flex justify-content-between">
											<small className="name">{file && file.name} &#8226; Uploading</small>
											<small className="name">{addPages && addPages.name} &#8226; Uploading</small>
											<small className="percent">{perc.toFixed(2) + "%"}</small>
											<small className="size fw-4">{((loaded/1024 < 1024) ? (loaded / 1024).toFixed(2) + " KB" : (loaded / (1024*1024)).toFixed(2) + " MB")}</small>
										</div>
										<div className="progress-bar rounded-pill bg-white">
											<div className="progress" style={{width: `${perc}%`}}></div>
										</div>
									</div>
								</li>
							</section>

							<div className="m-3 me-auto border-0 d-flex flex-row">
								<button className='btn btn-outline-success mx-2 px-4 d-flex align-items-center' disabled={(err) ? true : false} onClick={handleAdd}>
									{loading && <Spinner color="text-info" />}
									{!loading && <>
										<span>Run</span>
										<img src={images.play} alt="" className='ms-2 img-fluid' style={{width: "20px", height: "20px"}}/>
									</>}
								</button>

								{url && 
								<a href={url} className="text-decoration-none" download={(resultFileName !== "") ? `${resultFileName}.pdf` : "result.pdf"}>
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
	);
}

export default AddPageModal;