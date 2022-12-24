import React from 'react';
import Service from "../components/Service";
import {Helmet} from "react-helmet-async";

const BroService = () => {
    return (
        <>
            <Helmet prioritizeSeoTags>
                <title>Bro Service | AppleUz</title>
                <meta property="og:title" content={`Bro Service | AppleUz`}/>
            </Helmet>
           <Service/>
        </>
    );
};

export default BroService;
