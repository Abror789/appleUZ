import React from 'react';
import {Helmet} from "react-helmet-async";
import {useParams} from "react-router-dom";
import ProductViewOne from "../components/ProductView";

const ProductView = () => {
    const params=useParams()
    const paramName=params.product
    const splitName=paramName?.split('-').join(' ')
    return (
        <>
            <Helmet prioritizeSeoTags>
                <title>{splitName} | AppleUz</title>
                <meta property="og:title" content={`${paramName} | AppleUz`}/>
            </Helmet>
            <ProductViewOne/>
        </>
    );
};

export default ProductView;
