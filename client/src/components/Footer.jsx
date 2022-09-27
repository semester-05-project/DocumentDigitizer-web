import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-dark row' id='footer' style={{height: "300px"}}>
        <div className="icons my-5 d-flex col-3 mx-auto justify-content-center">
            <Link to="#" className="mx-3"><i className="fab fa-facebook-f"></i></Link>
            <Link to="#" className="mx-3"><i className="fas fa-envelope"></i></Link>
            <Link to="#" className="mx-3"><i className="fab fa-whatsapp"></i></Link>
        </div>
        <hr className='text-muted mt-3' />
        <h5 className="lead text-muted text-center">Copyright</h5>
    </div>
  )
}

export default Footer;