import React, {SyntheticEvent, useEffect, useState,MouseEvent} from 'react';
import {Link, useNavigate} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {useLocation} from "react-router-dom";
import {priceToString} from "../../utils/price";
import axios from "axios";
import {baseUrl, fileUrl} from "../../Redux/variable";
import PageLoad from "../PageLoad";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, decrementQuantity, incrementQuantity} from "../../Redux/features/cart/cartSlice";
import { addToLike, removeItem } from '../../Redux/features/like/likeSlice';
import NewProduct from "../NewProduct";
import SimilarProducts from "../SimilarProducts";

type ProductOriginal={
    _id:string,
    title:string,
    category:string,
    images:string[],
    price:number,
    characters:{
        name:string,
        char:string,
        _id:string
    }[],
    createdAt:string,
    updatedAt:string,
    isLike:boolean,
    __v:number
}

const ProductViewOne = () => {
    const cart = useSelector((state:any) => state.cartReducer.cart)
    const like = useSelector((state:any) => state.like.like)
    const dispatch=useDispatch()





    const newArr=cart?.map((item:any)=>item._id)
    const newArrLike=like?.map((item:any)=>item._id)


    const getQ = (id:any) => {
        const filterArr=cart.filter((el:any)=>el._id===id)
        return filterArr[0].quantity
    }




    const [productOriginal,setProductOriginal]=useState<ProductOriginal>()
    const [loading,setLoading]=useState<boolean>(false)
    const location=useLocation()
    const product_id=location?.search.slice(1)
    const [pageLoad,setPageLoad]=useState(false)

    const changeImgLoad = (e:MouseEvent<HTMLAnchorElement>) => {
        setLoading(true)
        if (images.length>=1){
            setLoading(false)
        }
    }

    useEffect(()=>{
        setPageLoad(true)
        axios.get(`${baseUrl}products/${product_id}`)
            .then((res)=>{
                setProductOriginal(res?.data?.product)
                setPageLoad(false)
                // console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
            //     write something then finished all response
            })
    },[product_id])
    const images=productOriginal?.images.map(item=>({original:`${fileUrl}${item}`,thumbnail:`${fileUrl}${item}`})) || []
    return (
        <>
            {
                !pageLoad
                    ?
                    <section className={"product_view"}>
                        <div className="container">
                            <div className="row">
                                <div className="colSix">
                                    <div className="productWrapper">
                                        <div className="productWrapperCarousel">
                                            <ImageGallery  onThumbnailClick ={(e)=>{
                                                changeImgLoad(e)
                                            }} lazyLoad={true} showPlayButton={false} disableThumbnailScroll={true}    items={images} />
                                            {loading&&<div className="loading">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px"
                                                     viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{
                                                    margin: "auto",
                                                    background: "transparent",
                                                    display: "block",
                                                    shapeRendering: "auto"
                                                    // shape-rendering: "auto"
                                                }}>
                                                    <g transform="rotate(0 50 50)">
                                                        <rect x="47" y="24" rx="1.2" ry="1.2" width="6" height="12" fill="#0066cc">
                                                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                                                     begin="-0.9090909090909091s"
                                                                     repeatCount="indefinite"></animate>
                                                        </rect>
                                                    </g>
                                                    <g transform="rotate(32.72727272727273 50 50)">
                                                        <rect x="47" y="24" rx="1.2" ry="1.2" width="6" height="12" fill="#0066cc">
                                                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                                                     begin="-0.8181818181818182s"
                                                                     repeatCount="indefinite"></animate>
                                                        </rect>
                                                    </g>
                                                    <g transform="rotate(65.45454545454545 50 50)">
                                                        <rect x="47" y="24" rx="1.2" ry="1.2" width="6" height="12" fill="#0066cc">
                                                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                                                     begin="-0.7272727272727273s"
                                                                     repeatCount="indefinite"></animate>
                                                        </rect>
                                                    </g>
                                                    <g transform="rotate(98.18181818181819 50 50)">
                                                        <rect x="47" y="24" rx="1.2" ry="1.2" width="6" height="12" fill="#0066cc">
                                                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                                                     begin="-0.6363636363636364s"
                                                                     repeatCount="indefinite"></animate>
                                                        </rect>
                                                    </g>
                                                    <g transform="rotate(130.9090909090909 50 50)">
                                                        <rect x="47" y="24" rx="1.2" ry="1.2" width="6" height="12" fill="#0066cc">
                                                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                                                     begin="-0.5454545454545454s"
                                                                     repeatCount="indefinite"></animate>
                                                        </rect>
                                                    </g>
                                                    <g transform="rotate(163.63636363636363 50 50)">
                                                        <rect x="47" y="24" rx="1.2" ry="1.2" width="6" height="12" fill="#0066cc">
                                                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                                                     begin="-0.45454545454545453s"
                                                                     repeatCount="indefinite"></animate>
                                                        </rect>
                                                    </g>
                                                    <g transform="rotate(196.36363636363637 50 50)">
                                                        <rect x="47" y="24" rx="1.2" ry="1.2" width="6" height="12" fill="#0066cc">
                                                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                                                     begin="-0.36363636363636365s"
                                                                     repeatCount="indefinite"></animate>
                                                        </rect>
                                                    </g>
                                                    <g transform="rotate(229.0909090909091 50 50)">
                                                        <rect x="47" y="24" rx="1.2" ry="1.2" width="6" height="12" fill="#0066cc">
                                                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                                                     begin="-0.2727272727272727s"
                                                                     repeatCount="indefinite"></animate>
                                                        </rect>
                                                    </g>
                                                    <g transform="rotate(261.8181818181818 50 50)">
                                                        <rect x="47" y="24" rx="1.2" ry="1.2" width="6" height="12" fill="#0066cc">
                                                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                                                     begin="-0.18181818181818182s"
                                                                     repeatCount="indefinite"></animate>
                                                        </rect>
                                                    </g>
                                                    <g transform="rotate(294.54545454545456 50 50)">
                                                        <rect x="47" y="24" rx="1.2" ry="1.2" width="6" height="12" fill="#0066cc">
                                                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                                                     begin="-0.09090909090909091s"
                                                                     repeatCount="indefinite"></animate>
                                                        </rect>
                                                    </g>
                                                    <g transform="rotate(327.27272727272725 50 50)">
                                                        <rect x="47" y="24" rx="1.2" ry="1.2" width="6" height="12" fill="#0066cc">
                                                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                                                     begin="0s" repeatCount="indefinite"></animate>
                                                        </rect>
                                                    </g>
                                                </svg>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <div  className="colSix">
                                    <div className="productInfo">
                                        <div className="productInfoInner">
                                            <div className="productInfoHeader">
                                                <div className="productName">
                                                    <h1>{productOriginal?.title}</h1>
                                                    {/*<h3>{activeProductMemory?.title} {activeProductImg.title}</h3>*/}
                                                </div>
                                                <div className="share">
                                                    <div className="shareLeft">
                                                        <button>
                                                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.7175 3.09494V0.660671C10.7175 0.112103 11.3232 -0.182752 11.7346 0.123532L11.8055 0.185245L16.9449 5.23664C17.1849 5.47321 17.2066 5.85264 17.01 6.11435L16.9449 6.18863L11.8055 11.2435C11.4192 11.6229 10.7918 11.3795 10.7232 10.8617L10.7175 10.768V8.37262L10.4226 8.39891C8.3655 8.61948 6.39294 9.56918 4.49466 11.264C4.04895 11.6617 3.36096 11.2869 3.4341 10.6857C4.00324 6.01149 6.38837 3.43437 10.4603 3.11208L10.7175 3.09494V3.09494Z" fill="#0066cc"></path><path d="M2.85712 1.14294C2.09937 1.14294 1.37265 1.44396 0.836832 1.97978C0.301018 2.51559 0 3.24231 0 4.00007V13.1429C0 13.9006 0.301018 14.6273 0.836832 15.1632C1.37265 15.699 2.09937 16 2.85712 16H11.9999C12.7577 16 13.4844 15.699 14.0202 15.1632C14.556 14.6273 14.857 13.9006 14.857 13.1429V12C14.857 11.8485 14.7968 11.7031 14.6897 11.596C14.5825 11.4888 14.4372 11.4286 14.2856 11.4286C14.1341 11.4286 13.9887 11.4888 13.8816 11.596C13.7744 11.7031 13.7142 11.8485 13.7142 12V13.1429C13.7142 13.5975 13.5336 14.0336 13.2121 14.355C12.8906 14.6765 12.4546 14.8571 11.9999 14.8571H2.85712C2.40247 14.8571 1.96644 14.6765 1.64495 14.355C1.32346 14.0336 1.14285 13.5975 1.14285 13.1429V4.00007C1.14285 3.54541 1.32346 3.10938 1.64495 2.78789C1.96644 2.4664 2.40247 2.28579 2.85712 2.28579H6.28567C6.43722 2.28579 6.58257 2.22559 6.68973 2.11843C6.7969 2.01126 6.8571 1.86592 6.8571 1.71437C6.8571 1.56282 6.7969 1.41747 6.68973 1.31031C6.58257 1.20315 6.43722 1.14294 6.28567 1.14294H2.85712Z" fill="#0066cc"></path></svg>
                                                        </button>
                                                    </div>
                                                    {
                                                        !(newArrLike.includes(productOriginal?._id))
                                                            ?
                                                            <div onClick={()=>{
                                                                dispatch(addToLike({...productOriginal}))
                                                            }} className="shareRight">
                                                                <div className="heartWrapper">
                                                                    <svg width={18} height={18} className="MuiSvgIcon-root MuiSvgIcon-colorAction"
                                                                         focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path
                                                                            d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div onClick={()=>{
                                                                dispatch(removeItem(productOriginal?._id))
                                                            }} className="shareRight none_svg">
                                                                <div className="heartWrapper">
                                                                    <svg width={18} height={18} className="MuiSvgIcon-root"
                                                                         focusable="false"
                                                                         viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path
                                                                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                    }


                                                </div>
                                            </div>
                                            <div className={"characteristic"}>
                                                <h6>Texnik xususiyatlari</h6>
                                                {productOriginal?.characters.map((item,i)=>{
                                                    return(
                                                        <div key={i} className="params_row">
                                                            <div className="params_col">
                                                                <span>{item.name}</span>
                                                            </div>
                                                            <div className="params_col">
                                                                <span>{item.char}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            </div>

                                            {newArr.includes(productOriginal?._id)&&<div className={"quantity"}>
                                                <div className={"quantityInner"}>
                                                    <button disabled={getQ(productOriginal?._id)==1} onClick={()=>{
                                                        dispatch(decrementQuantity(productOriginal?._id))
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                             fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                        </svg>
                                                    </button>
                                                    <div>
                                                        <div>
                                                            {getQ(productOriginal?._id)}
                                                        </div>
                                                    </div>
                                                    <button onClick={()=>{
                                                        dispatch(incrementQuantity(productOriginal?._id))
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                             fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>}
                                            <div className={"price"}>
                                                <h6>
                                                    {priceToString(productOriginal?.price || 0)} so'm
                                                    <span>{priceToString(productOriginal?.price?productOriginal.price+414000:0)} so'm</span>
                                                    {/*<span>{priceToString(product.memory[0].oldPrice)} so'm</span>*/}
                                                    {/*{priceTostring(product.price)} so'm*/}
                                                    {/*<span>{priceTostring(product.oldPrice)} so'm</span>*/}
                                                </h6>
                                            </div>
                                            <div className={"btnContainer"}>
                                                <button onClick={()=>{
                                                    dispatch(addToCart({...productOriginal}))
                                                }}  disabled={(newArr.includes(productOriginal?._id))}>Savatchaga qo'shish</button>
                                                <button>Taqqoslash</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {productOriginal?.category && <SimilarProducts str={productOriginal?.category}/>}

                    </section>
                    :
                    <PageLoad/>
            }
        </>

    );
};

export default ProductViewOne;
