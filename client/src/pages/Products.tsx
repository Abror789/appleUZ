import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import ShopHeader from "../components/ShopHeader";
import ProductList from "../components/ProductList";
import {getProduct} from "../Redux/features/products/productSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Redux/store";
import PageLoad from "../components/PageLoad";

export interface Same {
    id?:number,
    title?:string,
    desc?:string
}
 type SameArray=Same[]

const Products = () => {
    const dispatch=useDispatch<any>()

    const params=useParams()
    const productsLis:SameArray=[
        {
            id:1,
            title:"Mac",
            desc:"AppleUz internet-do‘koni Toshkentda MacBook noutbuklarini xarid qilishni taklif qiladi . Kompaniya 14 yildan ortiq " +
                "vaqt davomida ushbu elektronikani yetkazib berishga ixtisoslashgan. Biz Apple kompaniyasining O'zbekistondagi " +
                "distribyutorimiz bo'lib, Amerikaning yetakchi ishlab chiqaruvchisidan mashhur noutbuklarni xarid qilish uchun " +
                "maqbul shart-sharoitlarni ta'minlash imkonini beradi. Katalogning ushbu bo'limida keltirilgan mahsulotlar " +
                "haqida ma'lumot va AppleUz internet do'konida Macbook noutbuklarini O'zbekistonda xarid qilishning afzalliklari " +
                "bilan tanishing . Sharh shuningdek, xaridorlarning tez-tez so'raladigan savollariga javob beradi."
        },
        {
            id:2,
            title: "iPhone",
            desc:"AppleUz internet-do‘koni Toshkentda iPhone sotib olishni taklif qilmoqda . Kompaniya uzoq vaqtdan beri Amerikaning " +
                "yetakchi ishlab chiqaruvchisidan smartfonlar yetkazib berishga ixtisoslashgan. Biz Apple kompaniyasining " +
                "O'zbekistondagi distribyutorimiz bo'lib, bu bizga eng mashhur brend telefonlarini xarid qilish uchun maqbul " +
                "shart-sharoitlarni ta'minlash imkonini beradi. Katalogning ushbu bo'limida keltirilgan mahsulotlar haqida ma'lumot" +
                " va AppleUz internet -do'konida O'zbekistonda iPhone xarid qilishning afzalliklari bilan tanishing . Sharh " +
                "shuningdek, xaridorlarning tez-tez so'raladigan savollariga javob beradi."
        },
        {
            id:3,
            title: "iPad",
            desc:"AppleUz internet-do‘koni Toshkentdagi iPad planshetlari toifasini taqdim etadi. Kompaniya 14 yildan ortiq vaqt " +
                "davomida Amerikaning yetakchi ishlab chiqaruvchisidan mobil gadjetlarni yetkazib berishga ixtisoslashgan. Biz " +
                "Apple kompaniyasining O'zbekistondagi distribyutorimiz, bu bizga mashhur planshetning eng yaxshi modellarini xarid" +
                " qilish uchun maqbul shart-sharoitlarni ta'minlash imkonini beradi. Katalogning ushbu bo'limidagi mahsulot haqida " +
                "ma'lumot va iPad xarid qilishning afzalliklari bilan tanishib chiqing Apple O'zbekistonda AppleUz onlayn do'konida." +
                " Sharh shuningdek, xaridorlarning tez-tez so'raladigan savollariga javob beradi."
        },
        {
            id:4,
            title: "Watch",
            desc: "AppleUz internet-do‘koni Toshkentdagi iWatch soatlari toifasini taqdim etadi. Kompaniya 14 yildan ortiq vaqt " +
                "davomida Amerikaning yetakchi ishlab chiqaruvchisidan mobil gadjetlarni yetkazib berishga ixtisoslashgan. Biz " +
                "Apple kompaniyasining O'zbekistondagi distribyutorimiz, bu bizga mashhur iWatchning eng yaxshi modellarini xarid" +
                " qilish uchun maqbul shart-sharoitlarni ta'minlash imkonini beradi. Katalogning ushbu bo'limidagi mahsulot haqida " +
                "ma'lumot va iWatch xarid qilishning afzalliklari bilan tanishib chiqing Apple O'zbekistonda AppleUz onlayn do'konida." +
                " Sharh shuningdek, xaridorlarning tez-tez so'raladigan savollariga javob beradi."
        }
    ]
    const sameName=productsLis.find(el=>el?.title?.toLowerCase()===params?.product)



    // useEffect(()=>{
    //     dispatch(getProduct(sameName?.title))
    // },[params])
    // const defaultList = useSelector((state: RootState) => state.products)
    //
    // const {status}=defaultList
    // const {list}=defaultList
    //
    // useEffect(()=>{
    //   console.log('one')
    // },[])



    return (
        <>
            <Helmet prioritizeSeoTags>
                <title>{sameName?.title} | AppleUz</title>
                <meta property="og:title" content={`${sameName?.title} | AppleUz`}/>
            </Helmet>
            <ShopHeader sameObj={sameName}/>
            <ProductList sameObj={sameName} />
        </>
    );
};

export default Products;
