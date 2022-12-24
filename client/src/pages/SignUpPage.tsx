import React from 'react';
import {Helmet} from "react-helmet-async";
import SignUp from "../components/SignUp";

const SignUpPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags>
                <title>Ro'yxatdan o'tish | AppleUz</title>
                <meta property="og:title" content={`Ro'yxatdan o'tish | AppleUz`}/>
            </Helmet>
            <SignUp/>
        </>
    );
};

export default SignUpPage;
