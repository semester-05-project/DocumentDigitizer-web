import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

const Logout = () => {

    // const {currentUser} = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.setItem("user", null);
        document.location.reload();
    }

    return (
        <div className='modal fade' id='logout-modal' aria-hidden='true' aria-labelledby='logout-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="title display-6 my-4 text-center">LOGOUT</h2>
                        <div className="row my-3 justify-content-evenly">
                            <div className="col-4 d-flex justify-content-end">
                                <button type="button" className="btn btn-outline-dark px-5 my-5 shadow-lg" data-bs-dismiss="modal">Cancel</button>
                            </div>
                            <div className="col-4 d-flex justify-content-start">
                                <button type="submit" onClick={handleLogout} className="btn btn-dark px-5 my-5 shadow-lg">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Logout;