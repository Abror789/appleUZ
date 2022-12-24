import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Slider from "react-slick";
import {getProduct} from "../../Redux/features/products/productSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Redux/store";

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
type similarProductProps={
    str:string
}

const SimilarProducts = (props:similarProductProps) => {
    // const [products,setProducts]=useState<Products>([])
    const params=useParams()
    const dispatch=useDispatch<any>()

    const {str}=props

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
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
    // const sameName=productsLis.find(el=>el?.title?.toLowerCase()===params?.product)
    // console.log(params)


    useEffect(()=>{
        dispatch(getProduct(`?category=${str}`))
    },[params])
    const defaultList = useSelector((state: RootState) => state.products)
    const {list}=defaultList

    return (
        <section className={'newProduct similar_products'}>
            <div className={"container"}>
                <h1 className={"mainTitle"}>O'xshash mahsulotlar</h1>
                {/*{title!=="Yangi mahsulotlar" && <Link className={"see_more"} to={`products/${title.toLowerCase()}`}>Barchasini ko'rish...</Link>}*/}
                <div className={"carouselCarousel"}>
                    <Slider {...settings}>
                        {list?.map((item,i)=>{
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

export default SimilarProducts;
