import React, { useState, useEffect } from 'react';
import { images } from '../javascript/imageImports';
import axios from 'axios';

const MergeModal = () => {
	const [files, setFiles] = useState(null);
	const [url, setUrl] = useState(null);
	const [progress, setProgress] = useState(0);
	const [loaded, setLoaded] = useState(0);

	const handleFileInput = (e) => {
		e.target.parentElement.querySelector('.file-input').click();
	}

	const addFiles = (f) => {
		let new_files = files ? [...files] : [];
		for (let i = 0; i < f.length; i += 1){
			new_files.push(f[i]);
		}
		setFiles(new_files);
	}

	const handleFileDisplay = () => {
		if (files){
			let rows = []
			for (let i = 0; i < files.length; i += 1){
				let date = new Date(files[i].lastModifiedDate);
				rows.push(
					<tr key={i}>
						<th scope='row'>{i + 1}</th>
						<td>{files[i].name}</td>
						<td>{(files[i].size/1024 < 1024) ? (files[i].size / 1024).toFixed(2) + " KB" : (files[i].size / (1024*1024)).toFixed(2) + " MB"}</td>
						<td>{date.toDateString()}</td>
					</tr>
				)
			}
			return rows;
		}
	}

	const handleClearAll = (e) => {
		setFiles(null);
		setUrl(null);
		const input = e.target.parentElement.querySelector('.file-input');
		input.value = "";
		
	}

	const handleSortFilesByName = () => {
		let new_files = [];
		if (files){
			for (let i = 0; i < files.length; i += 1){
				new_files.push(files[i]);
			}

			new_files.sort((file1, file2) => file1.name < file2.name ? 1 : file1.name > file2.name ? -1 : 0);

			setFiles(new_files);
		}
		
	}

	const handleSortFilesBySize = () => {
		let new_files = [];
		if (files){
			for (let i = 0; i < files.length; i += 1){
				new_files.push(files[i]);
			}

			new_files.sort((file1, file2) => file1.size < file2.size ? 1 : file1.size > file2.size ? -1 : 0);

			setFiles(new_files);
		}
	}

	const handleSortFilesByLastModifiedDate = () => {
		let new_files = [];
		if (files){
			for (let i = 0; i < files.length; i += 1){
				new_files.push(files[i]);
			}

			new_files.sort((file1, file2) => file1.lastModifiedDate < file2.lastModifiedDate ? 1 : file1.lastModifiedDate > file2.lastModifiedDate ? -1 : 0);

			setFiles(new_files);
		}
	}

	const handleFileUpload = () => {
		if (files && files.length > 1){
			const formData = new FormData();
			files.forEach(file => {
				formData.append("files", file);
			});
			formData.append("files", files);
			
			const config = {
				onUploadProgress: function(progressEvent){
					const percentCompleted = (progressEvent.loaded / progressEvent.total)*100;
					setProgress(percentCompleted);
					setLoaded(progressEvent.loaded);
				},
				responseType: "arraybuffer"
			}
			axios.post(`http://localhost:4000/tools/merge`, formData, config)
				.then(res => {
					console.log(res);
					let url = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
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
			alert("Select more than one file to merge");
		}
	}


	return (
		<div className="modal fade" id="mergeModal" tabIndex="-1" aria-labelledby="mergeModal" aria-hidden="true">
			<div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-body">
						<button type="button" className="btn-close m-3" data-bs-dismiss="modal" aria-label="Close"></button>
						<div className="files-to-merge card m-3 mx-auto" style={{width: "90vw", minHeight: "12rem"}}>
							<div className="card-body">
								<input type="file" accept='application/pdf' className='file-input' onChange={e => addFiles(e.target.files)} multiple hidden />
								<button className='btn btn-outline-info mb-2 mx-2' onClick={e => handleFileInput(e)}>Add</button>
								<button className='btn btn-outline-danger mb-2 mx-2' onClick={handleClearAll}>Clear All</button>
								<table className="table align-middle table-striped table-hover table-bordered col-8 text-center">
									<thead className="thead">
										<tr>
											<th scope="col">#</th>
											<th scope="col">File Name</th>
											<th scope="col">File Size</th>
											{/* <th scope="col">Pages</th> */}
											<th scope="col">Last Modified</th>
										</tr>
									</thead>
									<tbody className="tbody">
										{handleFileDisplay()}
									</tbody>
								</table>

								<div className="sort-buttons d-flex flex-column">
									<button className="btn btn-outline-dark m-2 px-3 me-auto" onClick={handleSortFilesByName} style={{maxWidth: "40%"}}>Arrange Files by Name</button>
									<button className="btn btn-outline-dark m-2 px-3 me-auto" onClick={handleSortFilesBySize} style={{maxWidth: "40%"}}>Arrange Files by Size</button>
									<button className="btn btn-outline-dark m-2 px-3 me-auto" onClick={handleSortFilesByLastModifiedDate} style={{maxWidth: "40%"}}>Arrange Files by Last Modified</button>
								</div>
							</div>
						</div>
						<div className="card m-3 mx-auto border-0 d-flex flex-row" style={{width: "90vw"}}>
							<button className='btn btn-outline-success mx-2 px-4 d-flex align-items-center' onClick={handleFileUpload}>
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
	);
}

export default MergeModal;