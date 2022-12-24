import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import "react-input-range/lib/css/index.css";
import InputRange from 'react-input-range';
import {priceToString} from "../../utils/price";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fileUrl} from "../../Redux/variable";
import {addToCart, decrementQuantity, incrementQuantity} from "../../Redux/features/cart/cartSlice";
import { useQueryParam, withDefault, StringParam } from 'use-query-params';
import { addToLike, removeItem } from '../../Redux/features/like/likeSlice';
import {getProduct} from "../../Redux/features/products/productSlice";
import {RootState} from "../../Redux/store";
import PageLoad from "../PageLoad";
import {Same} from "../../pages/Products";

type Price={
    min:number,
    max:number
}

interface sameObj{
    sameObj:Same | undefined
}
const ProductList = ({sameObj}:sameObj) => {

    const dispatch=useDispatch<any>()
    const navigate=useNavigate()
    const location=useLocation()
    const [sortType, setSortType] = useQueryParam('sortType', withDefault(StringParam, '-createdAt'))
    // const [priceUrl, setPriceUrl] = useQueryParam('min', withDefault(StringParam, ''))
    // const [priceUrlS, setPriceUrlS] = useQueryParam('max', withDefault(StringParam, ''))



    // Fetch product with Redux Toolkit and createAsyncThunk
    useEffect(()=>{
        if (sameObj){
            dispatch(getProduct(`?category=${sameObj?.title}&sortType=${sortType.includes('-')?sortType.slice(1):sortType}&sortValue=${sortType.includes('-')?-1:1}`))
            //
        }

    },[sameObj,sortType,location])
    // console.log(location.search)
    const defaultList = useSelector((state: RootState) => state.products)

    const {status}=defaultList
    const {list}=defaultList


    // shopping cart and likely product logic

    const cart = useSelector((state:any) => state.cartReducer.cart)
    const like = useSelector((state:any) => state.like.like)

    const newArr=cart?.map((item:any)=>item._id)
    const newArrLike=like?.map((item:any)=>item._id)

    const getQ = (id:any) => {
        const filterArr=cart.filter((el:any)=>el._id===id)
        return filterArr[0].quantity
    }

    // Product filter with its parameters
    const filterFindFunc = (text:string) => {
        const filterItem=list
            .map((item)=>item.characters
                .filter((e)=>e.name==`${text}`))
            .filter((ed)=>ed[0]!=undefined)
            .map((ed1)=>ed1[0])

        return [...new Set(filterItem.map(obj => obj.char))]
    }
    const hard =filterFindFunc("Hard(SSD)")
    const ram =filterFindFunc("Ram")
    const diagonal =filterFindFunc("Ekran dioganali")
    const ramPhone =filterFindFunc("RAM ")
    const protsessor =filterFindFunc("protsessor")
    const size =filterFindFunc("Razmeri")



    const handleOnChangeDiagonal = (e:ChangeEvent<HTMLInputElement>,str:string) => {

        if (e.target.checked){
            if (location.search.length>=1){
                navigate(`${location.search}?${str}=${e.target.value}`)
            } else {
                navigate(`?${str}=${e.target.value}`)
            }
        }else {
            if (!location.search.includes('=')){
                navigate(`${location.pathname}`)
            }else {
                navigate(`${location.search.replace(`?${str}=${e.target.value}`,'')}`)
            }
        }
    }




    //Product Filter with price logic area_________________________________

    const str=location?.search?.split('?')?.splice(1)
    const minStr=str?.filter(item=>item.includes('min'))
    const maxStr=str?.filter(item=>item.includes('max'))

    const [price,setPrice]=useState<Price>({
        min:(Number(minStr? minStr[minStr.length-1]?.slice(4) :0) || 0),
        max:(Number(maxStr? maxStr[maxStr.length-1]?.slice(4) :30000000) || 30000000)
    })
    const handlePrice = (value:any) => {
        if ('min' in value && 'max' in value){
            setPrice({...price,min:value.min,max:value.max})
        }
    }
    const navigatePrice = (e:any) => {
        if (location.search.length>=1){
            navigate(`${location.search}?min=${e.min}?max=${e.max}`)
        } else {
            navigate(`?min=${e.min}?max=${e.max}`)
        }
    }


    // Product Navbar Logic area______________________________

    const [isFilterOpen,setIsFilterOpen]=useState<boolean>(true)
    const [currentItem,setCurrentItem]=useState<string>('Eng yangi')
    const [isOpen,setIsOpen]=useState<boolean>(false)
    const [btnActive,setBtnActive]=useState<number>(0)
    const documentElement=document.body
    documentElement.addEventListener('click',()=>{
        setIsOpen(false)
    })
    const handleOpen = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }
    const handleOpenFilter = () => {
        setIsFilterOpen(!isFilterOpen)
    }

    useEffect(()=>{
       if (sortType==='-price'){
           setCurrentItem('Narx:Qimmat')
       }else if (sortType==='price'){
           setCurrentItem('Narx:Arzon')
       }else {
           setCurrentItem('Eng yangi')
       }
    },[sortType])

    const handleSortType = (type:string,value:string) => {
        // if (location.search.length>=1 && !(location.search.includes('sortType'))){
        //     navigate(`${location.search}&sortType=${value}`)
        // }else if (location.search.length>=1 && location.search.includes('sortType')){
        //     const url=new window.URL(window.location.href)
        //     // console.log(url)
        //     url.searchParams.set('sortType',value)
        //     window.history.pushState({}, '', url);
        // } else {
        //     navigate(`?sortType=${value}`)
        // }

        setSortType(value)
    }
    // console.log(location.search)

    return (
       <>
           {status==='success'
                ?
               <section className={"product_list"}>
                   <div className="product_lis_navbar">
                       <div className="container">
                           <div className="filter_btn">
                               {/*<button onClick={handleOpenFilter}>*/}
                               {/*    <svg width={24} height={24} className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">*/}
                               {/*        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path>*/}
                               {/*    </svg>*/}
                               {/*    Filter*/}
                               {/*</button>*/}
                           </div>
                           <div className="product_list_sort">
                               <button>
                                   <span className={"sort_type"}>Saralash turi:</span>
                                   <div onClick={handleOpen} style={{display:'flex',alignItems:"center"}}>
                                       <span style={{cursor:"pointer",display:"block"}}>{currentItem}</span>
                                       <span style={{display:"block",marginTop:"5px",cursor:"pointer"}}>
                                    <svg width={"15"} height={"24"} className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24"
                                         aria-hidden="true"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                                </span>
                                   </div>
                                   <div className={isOpen?"sort_none":"sort_hide sort_none"}>
                                       <span onClick={()=>handleSortType('Eng yangi','-createdAt')}>Eng yangi</span>
                                       <span onClick={()=>handleSortType('Narx:Qimmat','-price')}>Narx: Qimmat</span>
                                       <span onClick={()=>handleSortType('Narx:Arzon','price')}>Narx: Arzon</span>
                                   </div>
                               </button>
                               <div className={'view_order'}>
                                   <button onClick={()=>{
                                       setBtnActive(0)

                                   }} className={btnActive===0?"view_order_btn active":"view_order_btn"}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-grid" viewBox="0 0 16 16">
                                           <path
                                               d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                                       </svg>
                                   </button>
                                   <button onClick={()=>{
                                       setBtnActive(1)

                                   }} className={btnActive===1?"view_order_btn active":"view_order_btn"}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-list-ul" viewBox="0 0 16 16">
                                           <path fillRule="evenodd"
                                                 d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                       </svg>
                                   </button>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="product_list_list">
                       <div className={isFilterOpen?'container':'container hide_container'}>
                           {/*<div className={isFilterOpen?"list_sort_wrapper":'list_sort_wrapper hide_wrapper'}>*/}
                           {/*    <div className={isFilterOpen?"list_sort_content":"list_sort_content hide_sort_content"}>*/}
                           {/*        /!*<div className="list_price">*!/*/}
                           {/*        /!*    <h6>Narx</h6>*!/*/}
                           {/*        /!*    <p>{priceToString(price.min) || 0} so'm – {priceToString(price.max)} so'm</p>*!/*/}
                           {/*        /!*    <span className={"list_range"}>*!/*/}
                           {/*        /!*     <InputRange*!/*/}
                           {/*        /!*         maxValue={30000000}*!/*/}
                           {/*        /!*         minValue={0}*!/*/}
                           {/*        /!*         value={price}*!/*/}
                           {/*        /!*         onChangeComplete={(e)=>{*!/*/}
                           {/*        /!*             navigatePrice(e)*!/*/}
                           {/*        /!*         }}*!/*/}
                           {/*        /!*         onChange={(value)=>{*!/*/}
                           {/*        /!*             handlePrice(value)*!/*/}
                           {/*        /!*         }}/>*!/*/}
                           {/*        /!*        /!*onChange={value =>setPrice({...price,...value})} />*!/*!/*/}
                           {/*        /!* </span>*!/*/}
                           {/*        /!*</div>*!/*/}
                           {/*        <div className="list_color">*/}
                           {/*            {ram.length>=1&&<h6>Tezkor xotira (RAM)</h6>}*/}
                           {/*            {ram?.map((item,i)=>{*/}
                           {/*                return(*/}
                           {/*                    <div key={i} className="list_color_item">*/}
                           {/*                        <label>*/}
                           {/*                            <input*/}
                           {/*                                onChange={(e) => handleOnChangeDiagonal(e,'ram')}*/}
                           {/*                                checked={location.search.includes(item.replace(/\s/g,""))}*/}
                           {/*                                value={item.replace(/\s/g,"")}*/}
                           {/*                                type="checkbox"/>*/}
                           {/*                            <span>{item}</span>*/}
                           {/*                        </label>*/}
                           {/*                    </div>*/}
                           {/*                )*/}
                           {/*            })}*/}

                           {/*            {size.length>=1&&<h6>Razmeri(MM)</h6>}*/}
                           {/*            {size?.map((item,i)=>{*/}
                           {/*                return(*/}
                           {/*                    <div key={i} className="list_color_item">*/}
                           {/*                        <label>*/}
                           {/*                            <input*/}
                           {/*                                onChange={(e) => handleOnChangeDiagonal(e,'size')}*/}
                           {/*                                checked={location.search.includes(item.replace(/\s/g,""))}*/}
                           {/*                                value={item.replace(/\s/g,"")}*/}
                           {/*                                type="checkbox"/>*/}
                           {/*                            <span>{item}</span>*/}
                           {/*                        </label>*/}
                           {/*                    </div>*/}
                           {/*                )*/}
                           {/*            })}*/}


                           {/*            {ramPhone.length>=1&&<h6>RAM</h6>}*/}
                           {/*            {ramPhone?.map((item,i)=>{*/}
                           {/*                return(*/}
                           {/*                    <div key={i} className="list_color_item">*/}
                           {/*                        <label>*/}
                           {/*                            <input*/}
                           {/*                                onChange={(e) => handleOnChangeDiagonal(e,'ramPhone')}*/}
                           {/*                                checked={location.search.includes(item.replace(/\s/g,""))}*/}
                           {/*                                value={item.replace(/\s/g,"")}*/}
                           {/*                                type="checkbox"/>*/}
                           {/*                            <span>{item}</span>*/}
                           {/*                        </label>*/}
                           {/*                    </div>*/}
                           {/*                )*/}
                           {/*            })}*/}
                           {/*            {protsessor.length>=1 && <h6>Protsessor</h6>}*/}
                           {/*            {protsessor?.map((item,i)=>{*/}
                           {/*                return(*/}
                           {/*                    <div key={i} className="list_color_item">*/}
                           {/*                        <label>*/}
                           {/*                            <input*/}
                           {/*                                onChange={(e) => handleOnChangeDiagonal(e,'protsessor')}*/}
                           {/*                                checked={location.search.includes(item.replace(/\s/g,""))}*/}
                           {/*                                value={item.replace(/\s/g,"")}*/}
                           {/*                                type="checkbox"/>*/}
                           {/*                            <span>{item}</span>*/}
                           {/*                        </label>*/}
                           {/*                    </div>*/}
                           {/*                )*/}
                           {/*            })}*/}

                           {/*        </div>*/}
                           {/*        { hard.length>=1 && <div className="list_color">*/}
                           {/*            {hard.length>=1&&<h6>Hard(SSD)</h6>}*/}
                           {/*            {hard?.map((item,i)=>{*/}
                           {/*                return(*/}
                           {/*                    <div key={i} className="list_color_item">*/}
                           {/*                        <label>*/}
                           {/*                            <input*/}
                           {/*                                onChange={(e) => handleOnChangeDiagonal(e,'hard')}*/}
                           {/*                                checked={location.search.includes(item.replace(/\s/g,""))}*/}
                           {/*                                value={item.replace(/\s/g,"")}*/}
                           {/*                                type="checkbox"/>*/}
                           {/*                            <span>{item}</span>*/}
                           {/*                        </label>*/}
                           {/*                    </div>*/}
                           {/*                )*/}
                           {/*            })}*/}



                           {/*        </div>}*/}
                           {/*        {diagonal.length>=1&&<div className="list_color">*/}
                           {/*            {diagonal.length >= 1 && <h6>Ekran Dioganali</h6>}*/}
                           {/*            {diagonal?.map((item, i) => {*/}
                           {/*                return (*/}
                           {/*                    <div key={i} className="list_color_item">*/}
                           {/*                        <label>*/}
                           {/*                            <input*/}
                           {/*                                onChange={(e) => handleOnChangeDiagonal(e,'diagonal')}*/}
                           {/*                                checked={location.search.includes(item.slice(0,-1))}*/}
                           {/*                                value={item.slice(0,-1)}*/}
                           {/*                                type="checkbox"/>*/}
                           {/*                            <span>{item}</span>*/}
                           {/*                        </label>*/}
                           {/*                    </div>*/}
                           {/*                )*/}
                           {/*            })}*/}
                           {/*        </div>}*/}
                           {/*    </div>*/}
                           {/*</div>*/}
                           <div className={isFilterOpen?"list_data":"list_data hide_list_data"}>
                               <div className={btnActive===0?"list_row":"list_row list_one"}>
                                   {list?.map((item,i)=>{
                                       const linkName=item.title.split(' ').join('-').replace("/","-")

                                       return(
                                           <div key={i} className="col_4">
                                               <div className="card">

                                                   {
                                                       newArrLike.includes(item._id)
                                                           ?
                                                           <button onClick={()=>{
                                                               dispatch(removeItem(item._id))
                                                           }} className={"heart"}>
                                                               <svg width={24} height={24} className="MuiSvgIcon-root"
                                                                    focusable="false"
                                                                    viewBox="0 0 24 24" aria-hidden="true">
                                                                   <path
                                                                       d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                                               </svg>
                                                           </button>
                                                           :
                                                           <button onClick={()=>{
                                                               dispatch(addToLike({...item}))
                                                           }} className='heart none_svg'>
                                                               <svg width={24} height={24} className="MuiSvgIcon-root MuiSvgIcon-colorAction"
                                                                    focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                   <path
                                                                       d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
                                                               </svg>
                                                           </button>
                                                   }





                                                   <div className={"product_link"}>

                                                       <Link to={`/product/${linkName}?${item._id}`}>
                                                           <div className="list_card_img">
                                                               <img src={`${fileUrl}${item.images[0]}`} alt={item.title}/>
                                                           </div>
                                                       </Link>
                                                       <div className="list_card_details">
                                                           <Link to={`/product/${linkName}?${item._id}`}>
                                                               <h3>{item.title}</h3>
                                                           </Link>
                                                           <span>{priceToString(item.price)} so'm dan</span>
                                                           {! (newArr?.includes(item._id))
                                                               ?
                                                               <button onClick={()=>{
                                                                   dispatch(addToCart({...item}))
                                                               }} className={"add_to_btn"}>
                                                                   <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M1.33301 1.74999C1.33301 1.24373 1.74342 0.833313 2.24969 0.833313H4.71301C5.14707 0.833313 5.52164 1.13774 5.61034 1.56264L6.22362 4.50004H17.8333C18.8458 4.50004 19.6666 5.32086 19.6666 6.3334V10.298C19.6666 11.166 19.0581 11.9149 18.2086 12.0926L8.24725 14.1761C7.25609 14.3833 6.28456 13.7479 6.07735 12.7567L3.96795 2.66668H2.24969C1.74342 2.66668 1.33301 2.25626 1.33301 1.74999ZM7.68189 11.4846C7.78538 11.9803 8.27118 12.2982 8.76684 12.1946L17.1042 10.4513C17.5289 10.3625 17.8333 9.98794 17.8333 9.55398V7.25008C17.8333 6.74382 17.4229 6.3334 16.9166 6.3334H6.6064L7.68189 11.4846Z" fill="#fff"></path><path d="M7.16669 19.1666C8.08718 19.1666 8.83338 18.4204 8.83338 17.4999C8.83338 16.5795 8.08718 15.8333 7.16669 15.8333C6.2462 15.8333 5.5 16.5795 5.5 17.4999C5.5 18.4204 6.2462 19.1666 7.16669 19.1666Z" fill="#ffff"></path><path d="M15.4997 19.1666C16.4202 19.1666 17.1664 18.4204 17.1664 17.4999C17.1664 16.5795 16.4202 15.8333 15.4997 15.8333C14.5792 15.8333 13.833 16.5795 13.833 17.4999C13.833 18.4204 14.5792 19.1666 15.4997 19.1666Z" fill="#fff"></path></svg>
                                                                   Savatchaga
                                                               </button>
                                                               :
                                                               <div className={"quantity"}>
                                                                   <div className={"quantityInner"}>
                                                                       <button disabled={getQ(item._id)==1} onClick={()=>{
                                                                           dispatch(decrementQuantity(item._id))
                                                                       }}>
                                                                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                                                               <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                                           </svg>
                                                                       </button>
                                                                       <div>
                                                                           <div>{getQ(item._id)}</div>
                                                                       </div>
                                                                       <button onClick={()=>{
                                                                           dispatch(incrementQuantity(item._id))
                                                                       }}>
                                                                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                                               <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                                           </svg>
                                                                       </button>
                                                                   </div>
                                                               </div>
                                                           }


                                                       </div>

                                                   </div>
                                               </div>
                                           </div>
                                       )
                                   })}

                               </div>
                           </div>
                       </div>
                   </div>
               </section>
               :
               <PageLoad/>
           }

       </>
    );
};


export default ProductList;
