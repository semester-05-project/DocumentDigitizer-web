import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../javascript/firebase';
import { addDoc, collection } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';



const Register = () => {
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPswError, setConfirmPswError] = useState("");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser){
            window.location = "/profile";
        }
    }, [currentUser]);

    const validateInput = () => {
        let valid = true;

        if (email === ""){
            setEmailError("Email cannot be empty");
            valid = false;
        }
        else if (! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            setEmailError("not a valid email");
            valid = false;
        }
        else{
            setEmailError("success");
        }

        // validate username
        if (username === ""){
            setUsernameError("Username cannot be empty");
            valid = false;
        }
        else if (! /^[a-zA-Z0-9]+$/.test(username)){
            setUsernameError("Only alphanumeric characters");
            valid = false;
        }
        else{
            setUsernameError("success");
        }

        // confirm password validation
        if (password === ""){
            setPasswordError("Password cannot be empty");
            valid = false;
        }
        else if (! /^(?=.*\d)(?=.*[a-z]).{8,}$/.test(password)){
            setPasswordError("At least one digit, one letter, and minimum 8 characters");
            valid = false;
        }
        else{
            setPasswordError("success");
        }

        if (confirmPassword === ""){
            setConfirmPswError("Please confirm the password");
            valid = false;
        }
        else if (password !== confirmPassword){
            setConfirmPswError("Password mismatch");
            valid = false;
        }
        else{
            setConfirmPswError("success");
        }

        return valid;

    }


    const onFormSubmit = async (e) => {
        e.preventDefault();

        const valid = validateInput();

        if (valid){
            const { user } = createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                console.log(user);
                const user = userCredential.user;
                console.log(user);

                await addDoc(collection(db, 'users'), {
                    email: email,
                    username: username
                }).then((res) => {
                    console.log(res)
                }).catch((err) => { console.log(err) });

                window.location = "/login";
            })
            .catch((error) => {
                console.log(error);
                setEmailError("Email already registered");
            })

            
        }
        
    }


    return (
        <div>
            <Navigation />
            <div className="register-container container-fluid p-0 m-0 mx-auto position-relative row">
                <div className="col-12 left-col"></div>
                {/* <div className="col-5 right-col"></div> */}
                <div className="register-card col-5 card position-absolute">
                    <div className="card-body">
                        <h1 className="display-6 text-center mt-3">REGISTER</h1>
                        <form className='p-5 text-center needs-validation' noValidate>
                            <div className="form-floating mb-3">
                                <input type="username" className={`form-control ${usernameError ? usernameError==="success" ? "is-valid" : "is-invalid" : ""}`} id='usernameInput' placeholder='akashtharuka' onChange={e => setUsername(e.target.value)} />
                                <label htmlFor="usernameInput">Username</label>
                                <div className="invalid-feedback">
                                    {usernameError}
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className={`form-control ${emailError ? emailError==="success" ? "is-valid" : "is-invalid" : ""}`} id='emailInput' placeholder='name@example.com' onChange={e => setEmail(e.target.value)} />
                                <label htmlFor="emailInput">Email Address</label>
                                <div className="invalid-feedback">
                                    {emailError}
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className={`form-control ${passwordError ? passwordError==="success" ? "is-valid" : "is-invalid" : ""}`} id='pswInput' placeholder='admin1234' onChange={e => setPassword(e.target.value)} />
                                <label htmlFor="pswInput">New Password</label>
                                <div className="invalid-feedback">
                                    {passwordError}
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className={`form-control ${confirmPswError ? confirmPswError==="success" ? "is-valid" : "is-invalid" : ""}`} id='confirmPswInput' placeholder='admin1234' onChange={e => setConfirmPassword(e.target.value)} />
                                <label htmlFor="confirmPswInput">Confirm Password</label>
                                <div className="invalid-feedback">
                                    {confirmPswError}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-outline-info px-5" onClick={onFormSubmit}>Submit</button>
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
        </div >
    )
}

export default Register;