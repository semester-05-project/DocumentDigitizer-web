import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../javascript/firebase';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {dispatch, currentUser} = useContext(AuthContext);

    useEffect(() => {
        if (currentUser){
            window.location = "/profile";
        }
    }, [currentUser]);

    const validateInput = () => {
        let valid = true;
        if (email === "" || password === ""){
            setError("Authentication Error");
            valid = false;
        }

        return valid;
    }
    
    const onFormSubmit = (e) => {
        e.preventDefault();

        const valid = validateInput();

        if (valid){
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Set the local storage
                    // console.log(userCredential)
                    const user = userCredential.user;
                    dispatch({ type: "LOGIN", payload: user });
                    // window.location = "/profile";
                })
                .catch((error) => {
                    setError("Authentication Error");
                })
        }

        
    }
    return (
        <div>
            <Navigation />
            <div className="login-container container-fluid p-0 m-0 mx-auto position-relative row">
                <div className="col-12 left-col"></div>
                {/* <div className="col-5 right-col"></div> */}
                <div className="login-card col-5 card position-absolute">
                    <div className="card-body">
                        <h1 className="display-6 text-center mt-3">LOGIN</h1>
                        <form className='p-5 text-center needs-validation' noValidate onSubmit={onFormSubmit}>
                            <div className="form-floating mb-3">
                                <input type="email" className={`form-control ${error ? "is-invalid" : ""}`} id='emailInput' placeholder='name@example.com' onChange={e => setEmail(e.target.value)} value={email} />
                                <label htmlFor="emailInput">Email Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className={`form-control ${error ? "is-invalid" : ""}`} id='pswInput' placeholder='admin1234' onChange={e => setPassword(e.target.value)} />
                                <label htmlFor="pswInput">Password</label>
                            </div>
                            <div data-testid="login-error-div" className={`err-div ${(error == "") ? "d-none" : ""} mb-2`}>
                                <small className="err-msg text-danger">
                                    <i className="fa fa-exclamation-circle me-2 text-danger"></i>
                                    {error}
                                </small>
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
        </div >
    )
}


export default Login;