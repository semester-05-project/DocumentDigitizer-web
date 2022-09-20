import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Login = () => {
  return (
    <div>
        <Navigation />
        <div className="login-container container-fluid p-0 m-0 mx-auto position-relative row">
            <div className="col-12 left-col"></div>
            {/* <div className="col-5 right-col"></div> */}
            <div className="login-card col-5 card position-absolute">
                <div className="card-body">
                    <h1 className="display-6 text-center mt-3">LOGIN</h1>
                    <form className='p-5 text-center'>
                        <div className="form-floating mb-3">
                            <input type="email" className='form-control' id='emailInput' placeholder='name@example.com' />
                            <label htmlFor="emailInput">Email Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className='form-control' id='pswInput' placeholder='admin1234' />
                            <label htmlFor="pswInput">Password</label>
                        </div>
                        <button type="submit" className="btn btn-outline-info px-5">Submit</button>
                        <div>
                            <h1 className="lead mt-3">No Account Yet?</h1>
                            <p className="signup-link">
                                <Link to="/register">Click here to register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;