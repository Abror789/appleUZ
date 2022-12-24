import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import {baseUrl} from "../../Redux/variable";
import {Link} from "react-router-dom";

type NewProductProps={
    title:string
}

type Products={
    _id:String,
    title:string,
    category:String,
    images:String[],
    price:Number,
    characters:{
        name:String,
        char:String,
        _id:String
    }[],
    createdAt:String,
    updatedAt:String,
    isLike:Boolean,
    __v:Number
}[]
const NewProduct = (props:NewProductProps) => {


    const [products,setProducts]=useState<Products>([])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const {title}=props

    useEffect(()=>{
        const url=title !=="Yangi mahsulotlar"?`?category=${title}`:`/news`
        axios.get(`${baseUrl}products${url}`)
            .then((res)=>{
                setProducts(res?.data?.products)
            })
            .catch((e)=>{
                console.log(e)
            })
    },[])
    return (
        <section className={"newProduct"}>
            <div className={"container"}>
                <h1 className={"mainTitle"}>{title}</h1>
                {title!=="Yangi mahsulotlar" && <Link className={"see_more"} to={`products/${title.toLowerCase()}`}>Barchasini ko'rish...</Link>}
                <div className={"carouselCarousel"}>
                    <Slider {...settings}>
                        {products?.slice(0,8).map((item,i)=>{
                            const linkName=item.title.split(' ').join('-').replace("/","-")
                            return(
                                <div key={i} className={"card"}>
                                    <Link to={`/product/${linkName}?${item._id}`}>
                                        <div className={"cardImage"}>
                                            <img src={`http://localhost:5000/images/${item.images[0]}`} alt={item.title}/>
                                        </div>
                                        <h3 className={"title"}>{item.title}</h3>
                                        <span className={'price'}><>{item.price} so'm dan</></span>
                                        <button className={"button"}>Xarid qilish</button>
                                    </Link>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default NewProduct;
