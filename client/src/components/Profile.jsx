import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

import Navigation from './Navigation';
import Footer from './Footer';
import Convertor from './Convertor';
import Merge from './Merge';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../javascript/firebase';
import firebase from 'firebase/compat/app';
import { AuthContext } from '../context/AuthContext';


const Profile = () => {

    const { currentUser } = useContext(AuthContext);
    
    const [doc, setDoc] = useState("");
    const [perc, setPerc] = useState(0);
    const [allFiles, setAllFiles] = useState([]);
    const [activeComponent, setActiveComponent] = useState("convertor");

    const handleDocInput = (e) => {
        const docInput = document.querySelector('.doc-input');
        docInput.click();
    }

    const handleDocUpload = (event) => {
        setDoc(event.target.files[0]);
    }

    const listAllFiles = (folder) => {
        const storageRef = firebase.storage().ref();
    
        const listRef = storageRef.child(folder);
    
        listRef.listAll()
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    // pass
                });
                res.items.forEach((itemRef) => {
                    itemRef.getDownloadURL().then((url) => {
                        let item = {name: itemRef.name, url: url};
                        setAllFiles(allFiles => [...allFiles, item]);
                        
                    });
                });
                
            })
            .catch(error => {
                console.log(error);
            });
    }

    const uploadFile = (folder) => {

        const storageRef = ref(storage, `${folder}/${doc.name}`);
        const uploadTask = uploadBytesResumable(storageRef, doc);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setPerc(progress);
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            default:
                break;
            }
        }, 
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    console.log("Permission denied");
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    console.log("Cancelled by the user");
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    console.log("Unknown error occurred");
                    break;
                default:
                    break;
            }
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
            listAllFiles('dpYbwJSlCGrVUU7ephe0/');
        }
        );

    }

    useEffect(() => {
        doc && uploadFile(currentUser.uid);
    }, [doc]);

    useEffect(() => {
        listAllFiles(currentUser.uid);
    }, []);

    const getAllFiles = () => {
        const itemNames = [];
        const docElementList = [];
        allFiles.map((item) => {
            if (! itemNames.includes(item.name)){
                itemNames.push(item.name);
                docElementList.push(
                    <section className={`uploaded-area p-3 rounded mb-2`} key={uuid()}>
                        <li className="row d-flex">
                            <div className="content d-flex col-9">
                                <i className="fas fa-file-alt col-1 fs-3 align-self-center"></i>
                                <div className="details col-11 d-flex flex-column ps-2 overflow-hidden">
                                    <small className="name">{item && item.name}</small>
                                    {/* <small className="size fw-4">{file && (item.size/1024 < 1024) ? (item.size / 1024).toFixed(2) + " KB" : (item.size / (1024*1024)).toFixed(2) + " MB"}</small> */}
                                </div>
                            </div>
                            <div className="options col-3 row justify-content-center">
                                <i className="fas fa-trash col-1 text-danger ms-1"></i>
                                <i className="fas fa-edit col-1 ms-1"></i>
                                <a href={item.url} target="_blank" rel='noreferrer' className='col-1 ms-1'><i className="fas fa-link text-primary"></i></a>
                            </div>
                            
                        </li>
                    </section>
                );
            }
        });
        return docElementList;
    }

    return (
        <div>
            <Navigation logged setActiveComponent={setActiveComponent} />

            <div className="profile container-fluid row p-0 m-0">
                <section className="document-section col-5 p-3 m-0 bg-light d-flex flex-column">
                    <div className='d-flex '>
                        <input className="form-control rounded-pill" type="search" placeholder="Search" aria-label="Search" />
                        <button type='search' className='btn btn-outline-dark rounded-circle ms-2'>
                            <i className='fa fa-search'></i>
                        </button>
                    </div>

                    {/* <form className='d-flex flex-column justify-content-center'>
                        <input className="file-input form-control form-control-sm mt-3" type="file" id="formFile"></input>
                        <button type='submit' className='upload-btn btn btn-warning rounded-pill my-3 mx-auto' 
                        onClick={(e) => {
                            e.preventDefault();
                            const fileInput = document.querySelector('.file-input');
                            setFile(fileInput.files[0]);
                        }} disabled={perc !== null && perc < 100}>Upload</button>
                    </form> */}

                    <div className="wrapper doc-upload d-flex flex-column p-4">
                        <form action="#" className='p-4 d-flex flex-column text-center justify-content-center rounded my-2 mb-4' onClick={handleDocInput}>
                            <input type="file" name='file' hidden className="doc-input doc-input" onChange={handleDocUpload} />
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
                                        <small className="size fw-4">{doc && (doc.size/1024 < 1024) ? (doc.size / 1024).toFixed(2) + " KB" : (doc.size / (1024*1024)).toFixed(2) + " MB"}</small>
                                    </div>
                                </div>
                                <i className="fas fa-check col-1 fs-4 p-0 align-self-center text-center"></i>
                            </li>
                        </section>
                    </div>

                    <div className="documents container d-flex flex-column m-0 p-0">
                        {getAllFiles()}
                    </div>
                    
                </section>

                <section className="document-view col-7 p-0 m-0">
                    {activeComponent === "nothing" && 
                        <div className='bg-light h-100 d-flex p-4 justify-content-center'>
                            <div className="card-body d-flex flex-column text-center justify-content-center">
                                <h3 className='lead p-5 border'>Select a feature from the menu</h3>
                            </div>
                        </div>
                    }
                    {activeComponent === "convertor" && <Convertor />}
                    {activeComponent === "merge" && <Merge />}
                </section>
            </div>

            <Footer />
        </div>
    )
}

export default Profile;