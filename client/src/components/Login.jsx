import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../javascript/firebase';


const Login = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // window.location = '/'
                console.log("You are already signed in")
            }
        });
    })
    const onFormSubmit = (e) => {
        if (!email) {
            alert("Enter Email");
            return;
        }
        if (!password) {
            alert("Enter password");
            return;
        }
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Set the local storage
                console.log(userCredential)
                const user = userCredential.user
            })
            .catch((error) => {
                // setError = error
                console.log(error)
            })
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
                        <form className='p-5 text-center' onSubmit={onFormSubmit}>
                            <div className="form-floating mb-3">
                                <input type="email" className='form-control' id='emailInput' placeholder='name@example.com' onChange={e => setEmail(e.target.value)} />
                                <label htmlFor="emailInput">Email Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className='form-control' id='pswInput' placeholder='admin1234' onChange={e => setPassword(e.target.value)} />
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
        </div >
    )
}


export default Login;