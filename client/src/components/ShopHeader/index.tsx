import React from 'react';
import {Same} from "../../pages/Products";

interface ShopHeaderProps{
    sameObj:Same | undefined
}

const ShopHeader = ({sameObj}:ShopHeaderProps) => {
    return (
        <section className="shop_header">
            <div className="container">
                <h1>{sameObj?.title}</h1>
                <p>{sameObj?.desc}</p>
            </div>
        </section>
    );
};

export default ShopHeader;
