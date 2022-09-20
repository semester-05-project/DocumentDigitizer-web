import React from 'react';

const Footer = () => {
  return (
    <div className='bg-dark row' style={{height: "300px"}}>
        <div className="icons my-5 d-flex col-3 mx-auto justify-content-center">
            <a href="#" className="mx-3"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="mx-3"><i className="fas fa-envelope"></i></a>
            <a href="#" className="mx-3"><i className="fab fa-whatsapp"></i></a>
        </div>
        <hr className='text-muted mt-3' />
        <h5 className="lead text-muted text-center">Copyright</h5>
    </div>
  )
}

export default Footer;