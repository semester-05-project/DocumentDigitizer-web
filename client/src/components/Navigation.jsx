import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top">

        <div className="container-fluid row">

            <HashLink className="navbar-brand col-4" to="/">LOGO</HashLink >

            <button className="navbar-toggler col-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse col-8" id="navbarNav">

                <ul className="navbar-nav col-12">

                    <li className="nav-item col-2">
                        <HashLink className="nav-link active" aria-current="page" to="/">Home</HashLink >
                    </li>
                    
                    <li className="nav-item col-2">
                        <HashLink className="nav-link" to="#">Features</HashLink >
                    </li>

                    <li className="nav-item col-2">
                        <HashLink className="nav-link" to="#">Support</HashLink >
                    </li>

                    <li className='col-6 d-flex flex-row justify-content-end'>
                        <button className='btn btn-outline btn-dark px-4 mx-3'>
                            <Link to="/login" className='login text-light'>Login</Link>
                        </button>
                        <button className='btn btn-dark px-4 mx-3'>
                            <Link to="/register" className='register text-light'>Register</Link>
                        </button>
                    </li>

                </ul>

            </div>

        </div>

    </nav>
  )
}

export default Navigation;