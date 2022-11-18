import React from 'react';

import Navigation from './Navigation';
import Footer from './Footer';
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