import React from 'react';
import {Helmet} from "react-helmet-async";
import Like from "../components/Like";

const LikePage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags>
                <title>Favourites | AppleUz</title>
                <meta property="og:title" content={`Favourites | AppleUz`}/>
            </Helmet>
            <Like/>
        </>
    );
};

export default LikePage;
