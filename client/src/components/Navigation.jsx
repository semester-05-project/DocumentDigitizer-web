import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from '../context/AuthContext';
import Logout from './Logout';

const Navigation = (props) => {

    const {currentUser} = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container-fluid row">

				<a className="btn bg-transparent text-light col-1" data-bs-toggle="offcanvas" href="#profile" role="button" aria-controls="profile">
					<i className="fa fa-bars text-white bg-transparent cursor-pointer" aria-hidden="true"></i>
				</a>
				
				
                <HashLink className="navbar-brand col-3" to="/">SCANME</HashLink >

                <button className="navbar-toggler col-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse col-8" id="navbarNav">

                    <ul className="navbar-nav col-12 d-flex justify-content-evenly">

                        <li className="nav-item col-2 d-flex flex-column align-self-center">
                            <HashLink className="nav-link active text-center" aria-current="page" to="/">Home</HashLink >
                        </li>
                        
                        {/* {currentUser && 
                        <li className="nav-item dropdown col-2 d-flex flex-column align-self-center">
                            <HashLink className="nav-link text-center dropdown-toggle" to="#" id='navbarDropdownMenuLink' role="button" data-bs-toggle="dropdown" aria-expanded="false">Features</HashLink >
                            <ul className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                                <li><a href="#" className='dropdown-item' onClick={() => props.setActiveComponent("convertor")}>Convertors</a></li>
                                <li><a href="#" className='dropdown-item' onClick={() => props.setActiveComponent("merge")}>Merge PDF</a></li>
                                <li><a href="#" className='dropdown-item'>Add Pages</a></li>
                                <li><a href="#" className='dropdown-item'>Remove Pages</a></li>
                                <li><a href="#" className='dropdown-item'>Rearrange pages</a></li>
                            </ul>
                        </li>} */}

                        <li className="nav-item col-2 d-flex flex-column align-self-center">
                            <HashLink className="nav-link text-center" to="#footer">Support</HashLink >
                        </li>

                        <li className='col-6 d-flex flex-row justify-content-end'>
                            {! currentUser && <Link to="/login" className='login'>
                                <button className='btn btn-outline-light px-4 mx-3'>Login</button>
                            </Link>}
                            {! currentUser && <Link to="/register" className='register'>
                                <button className='btn btn-light px-4 mx-3'>Register</button>
                            </Link>}
                            {currentUser && <p className='greeting my-auto'>Hello Akash!!!</p>}
                            {currentUser && <button className='logout btn btn-outline-danger px-4 mx-3' data-bs-toggle="modal" data-bs-target="#logout-modal" data-bs-dismiss="modal">Logout</button>}

                            <Logout />
                        </li>

                    </ul>

                </div>

            </div>

        </nav>
    );
};

export default Navigation;