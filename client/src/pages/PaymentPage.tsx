import React from 'react';
import {Helmet} from "react-helmet-async";
import Payment from "../components/Payment";

const PaymentPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags>
                <title>{"To'lov"} | AppleUz</title>
                <meta property="og:title" content={`To'lov | AppleUz`}/>
            </Helmet>
            <Payment/>
        </>
    );
};

export default PaymentPage;
