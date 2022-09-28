import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../javascript/firebase';
import { addDoc, collection } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';



const Register = () => {
    const [error, setError] = useState("");
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

    useEffect(() => {
        console.log(error);
    }, [error]);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Email should be valid")
            return;
        }
        if (!password) {
            setError("Password should be valid")
            return;
        }
        if (!confirmPassword) {
            alert("Enter Password Confirmation");
            return;
        }
        if (!username) {
            setError("Username should be valid")
            return;
        }
        if (password !== confirmPassword) {
            setError("Password should be match");
            return;
        }

        const { user } = createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Set the local storage
                console.log(userCredential)
                const user = userCredential.user
            })
            .catch((error) => {
                console.log(error)
            })

        await addDoc(collection(db, 'users'), {
            email: email,
            username: username
        }).then((res) => {
            console.log(res)
        }).catch((err) => { console.log(err) });
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
                        <form className='p-5 text-center'>
                            <div className="form-floating mb-3">
                                <input type="username" className='form-control' id='usernameInput' placeholder='akashtharuka' onChange={e => setUsername(e.target.value)} />
                                <label htmlFor="usernameInput">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className='form-control' id='emailInput' placeholder='name@example.com' onChange={e => setEmail(e.target.value)} />
                                <label htmlFor="emailInput">Email Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className='form-control' id='pswInput' placeholder='admin1234' onChange={e => setPassword(e.target.value)} />
                                <label htmlFor="pswInput">New Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className='form-control' id='confirmPswInput' placeholder='admin1234' onChange={e => setConfirmPassword(e.target.value)} />
                                <label htmlFor="confirmPswInput">Confirm Password</label>
                            </div>
                            <div>
                                {error && "oempmna"}</div>
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