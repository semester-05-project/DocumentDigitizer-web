import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { images } from '../javascript/imageImports';
// import PdfViewer from './PdfViewer';

const RemovePageModal = () => {
	const [err, setErr] = useState(null);
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState("");
	const [resultFileName, setResultFileName] = useState("");
	const [perc, setPerc] = useState(0);
	const [removedUrl, setRemovedUrl] = useState(null);
	const [pdfUrl, setPdfUrl] = useState(null);
	const [loaded, setLoaded] = useState(0);
	const [pages, setPages] = useState(0);
	const [checkedPages, setCheckedPages] = useState([]);

	const handleFileInput = (e) => {
		const input = e.target.parentElement.querySelector('.file-remove-input');
		input.click();
	}

	useEffect(() => {
		if (file){
            let fileName = file.name;
            if (fileName.length >= 12){
                let splitName = fileName.split('.');
                fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
            }
            uploadFile();  
        }
	}, [file]);

	const uploadFile = () => {
		if (file){
			const formData = new FormData();
			formData.append("file", file);
			
			const config = {
				onUploadProgress: function(progressEvent){
					const percentCompleted = (progressEvent.loaded / progressEvent.total)*100;
					setPerc(percentCompleted);
					setLoaded(progressEvent.loaded);
				},
				responseType: "arraybuffer"
			}
			axios.post(`http://localhost:4000/tools/getData`, formData)
				.then(res => {
					// console.log(res.data);
					setPages(res.data.pages);

					const name = res.data.name;
					setFileName(name);
					axios.post(`http://localhost:4000/tools/getBuffer`, { name }, { responseType: "arraybuffer" })
						.then(res => {
							// console.log(res.data);
							let url = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
							setPdfUrl(url);
						})
						.catch(err => console.err(err));
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
			alert("Select a file to remove pages");
		}
	}

	const handleRemove = () => {
		if (checkedPages.length !== 0){
			const body = {
				pages: checkedPages,
				fileName: fileName,
			}
			axios.post('http://localhost:4000/tools/removePages', body, { responseType: "arraybuffer" })
				.then(res => {
					// console.log(res.data);
					let url = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
					setRemovedUrl(url);
					setPdfUrl(url);
				})
				.catch(err => console.err(err));
		}
		else{
			alert("Pages are not selected to be removed");
		}
	}

	// useEffect(() => {
	// 	console.log(checkedPages);
	// }, [checkedPages]);

	const handlePageChecks = (e) => {
		if (e.target.checked){
			setCheckedPages([...checkedPages, e.target.value]);
		}
		else{
			setCheckedPages(checkedPages.filter((item) => {
				if (item != e.target.value){
					return item;
				}
			}))
		}
	}

	const getButtonsForPages = () => {
		let pageBtnList = [];
		for (let i = 0; i < pages; i++){
			pageBtnList.push(
				<div key={i} className="m-2">
					<input type="checkbox" className="btn-check" id={i+1} value={i+1} autoComplete='off' onChange={(e) => handlePageChecks(e)} />
					<label htmlFor={i+1} className="btn btn-outline-info">{i+1}</label>
				</div>
			);
		}
		return pageBtnList;
	}

	return (
		<div className="modal fade" id="removeModal" tabIndex="-1" aria-labelledby="removeModal" aria-hidden="true">
			<div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-body">
						<button type="button" className="btn-close m-3" data-bs-dismiss="modal" aria-label="Close"></button>
						
						<div className="container container-fluid row col-12 mx-auto">

							<div className="upload-section col-10 col-md-6">
								<div className="wrapper doc-upload d-flex flex-column p-4">
									<form className='p-4 d-flex flex-column text-center justify-content-center rounded my-2 mb-4 needs-validation' noValidate onClick={handleFileInput}>
										<input type="file" name='file' hidden accept='application/pdf' className={`file-remove-input ${(err) ? "is-invalid" : ""}`} onChange={(e) => setFile(e.target.files[0])} />
										<i className="fas fa-cloud-upload-alt fs-1"></i>
										<p className='mt-4 lead'>Browse File to Upload</p>
										<div className="invalid-feedback">
											{err}
										</div>
									</form>

									{/* Uploading */}
									<section className={`uploading-area p-3 rounded mb-2 ${(perc === 0 || perc === 100) ? "d-none" : ""}`}>
										<li className="row d-flex">
											<i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
											<div className="content col-11 px-3">
												<div className="details d-flex justify-content-between">
													<small className="name">{file && file.name} &#8226; Uploading</small>
													<small className="percent">{perc.toFixed(2) + "%"}</small>
												</div>
												<div className="progress-bar rounded-pill bg-white">
													<div className="progress" style={{width: `${perc}%`}}></div>
												</div>
											</div>
										</li>
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

							<div className="pdf-view col-10 col-md-6 p-4 my-2 bg-secondary">
								{/* pdf viewer here */}
								{!pdfUrl && <section className='text-center text-white'>
									No files added
								</section>}
								{pdfUrl && <iframe src={pdfUrl} frameBorder="0" style={{height: "400px", width: "100%"}}></iframe>}
							</div>

						</div>

						<div className="settings-section row col-10 p-4 my-2 mx-auto">
							<div className="split-files card w-100 mb-3">
								<div className="card-body">
									<h5 className="topic fs-5 mb-3">Remove selected pages</h5>

									<p className='fw-bold'>file name: {file ? file.name : "No file selected"}</p>
									<p className='fw-bold'>number of pages: {pages}</p>


									{(pages > 1) ? <>
										<p className={(file) ? "" : "d-none"}>Select the pages you want to remove</p>

									
										<div className="btn-group" role="group" aria-label="checkbox toggle button group for pages">
											{getButtonsForPages()}
										</div>

										<div className="m-3 me-auto border-0 d-flex flex-row">
											<button className='btn btn-outline-success mx-2 px-4 d-flex align-items-center' onClick={handleRemove}>
												<span>Run</span>
												<img src={images.play} alt="" className='ms-2 img-fluid' style={{width: "20px", height: "20px"}}/>
											</button>

											{removedUrl && 
											<a href={removedUrl} className="text-decoration-none" download={(resultFileName !== "") ? `${resultFileName}.pdf` : "result.pdf"}>
												<button className='btn btn-outline-success mx-2 px-4 d-flex align-items-center'>
													<span>Download</span>
													<img src={images.download} alt="" className='ms-2 img-fluid' style={{width: "20px", height: "20px"}}/>
												</button>
											</a>
											}
										</div>
									</> : <p className='text-danger'>Select a pdf file with more than one page</p>}
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
						</div>
						
					</div>
				</div>
				
			</div>
		</div>
	);
}

export default RemovePageModal;