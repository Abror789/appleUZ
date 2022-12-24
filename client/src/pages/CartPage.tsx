import React from 'react';
import {Helmet} from "react-helmet-async";
import Cart from "../components/Cart";

const CartPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags>
                <title>Savatcha | AppleUz</title>
                <meta property="og:title" content={`Savatcha | AppleUz`}/>
            </Helmet>
            <Cart/>
        </>
    );
};

export default CartPage;
