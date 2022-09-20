import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Register = () => {
  return (
    <div>
        <Navigation />
        <div className="register-container container-fluid p-0 m-0 mx-auto position-relative row">
            <div className="col-12 left-col"></div>
            {/* <div className="col-5 right-col"></div> */}
            <div className="register-card col-5 card position-absolute">
                <div className="card-body">
                    <h1 className="display-6 text-center mt-3">REGISTER</h1>
                    <form className='p-5 text-center'>
                        <div className="form-floating mb-3">
                            <input type="username" className='form-control' id='usernameInput' placeholder='akashtharuka' />
                            <label htmlFor="usernameInput">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className='form-control' id='emailInput' placeholder='name@example.com' />
                            <label htmlFor="emailInput">Email Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className='form-control' id='pswInput' placeholder='admin1234' />
                            <label htmlFor="pswInput">New Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className='form-control' id='confirmPswInput' placeholder='admin1234' />
                            <label htmlFor="confirmPswInput">Confirm Password</label>
                        </div>
                        <button type="submit" className="btn btn-outline-info px-5">Submit</button>
                        <div>
                            <h1 className="lead mt-3">Already have an account?</h1>
                            <p className="login-link">
                                <Link to="/login">Click here to login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register;