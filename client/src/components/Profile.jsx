import React, { useState, useEffect, useContext } from 'react';

import Navigation from './Navigation';
import Footer from './Footer';
import Convertor from './Convertor';
import Merge from './Merge';
import Features from './Features';
import CloudStorage from './CloudStorage';


const Profile = () => {

    return (
        <>
            <Navigation />

			<CloudStorage />

			<Features />

            <Footer />
        </>
    )
}

export default Profile;