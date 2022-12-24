import React from 'react';
import SignIn from "../components/SignIn";
import {Helmet} from "react-helmet-async";

const SignInPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags>
                <title>Kirish | AppleUz</title>
                <meta property="og:title" content={`Kirish | AppleUz`}/>
            </Helmet>
            <SignIn/>
        </>
    );
};

export default SignInPage;
