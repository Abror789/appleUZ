import React from 'react';
import Profile from "../components/Profile";
import {Helmet} from "react-helmet-async";

const ProfilePage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags>
                <title>Profile | AppleUz</title>
                <meta property="og:title" content={`Profile | AppleUz`}/>
            </Helmet>
           <Profile/>
        </>
    );
};

export default ProfilePage;
