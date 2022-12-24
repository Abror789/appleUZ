import React, {ChangeEvent, useEffect, useState} from 'react';
import apelsin from '../../assets/apelsin.png'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Redux/store";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {allQuantity, allSum} from "../../utils/allQuantity";
import {priceToString} from "../../utils/price";
import axios from "axios";
import {baseUrl, TOKEN} from "../../Redux/variable";
import {toast} from "react-toastify";
import {removeAllItem} from "../../Redux/features/cart/cartSlice";

type CartItem={
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
    quantity:number,
    __v:number
}

const Payment = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [fullName,setFullName]=useState<any>('')
    const [phone,setPhone]=useState<any>('')
    const [locus,setLocus]=useState<any>('')

    const [reception,setReception]=useState([
        {
            _id:0,
            key:"yourself",
            title:"O'zi olib ketish",
            svg:(
                <svg width="22" height="21" viewBox="0 0 22 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21.1406 4.89708L13.4483 0.666298C13.3347 0.603811 13.2072 0.571045 13.0775 0.571045C12.9479 0.571045 12.8203 0.603811 12.7068 0.666298L5.01443 4.89708C4.89383 4.96348 4.79325 5.06104 4.72321 5.17956C4.65316 5.29809 4.61621 5.43325 4.61621 5.57092C4.61621 5.7086 4.65316 5.84376 4.72321 5.96228C4.79325 6.08081 4.89383 6.17837 5.01443 6.24477L12.3083 10.2563V18.5017L9.97291 17.2171L9.23137 18.564L12.7068 20.4756C12.8203 20.5382 12.9479 20.571 13.0775 20.571C13.2072 20.571 13.3348 20.5382 13.4483 20.4756L21.1406 16.2448C21.2613 16.1784 21.3619 16.0809 21.432 15.9624C21.5021 15.8438 21.5391 15.7086 21.5391 15.5709V5.57092C21.5391 5.43322 21.5021 5.29805 21.432 5.17952C21.3619 5.06099 21.2613 4.96345 21.1406 4.89708ZM13.0775 2.21861L19.1737 5.57092L13.0775 8.92324L6.98136 5.57092L13.0775 2.21861ZM20.0006 15.1163L13.8468 18.501V10.2556L20.0006 6.87093V15.1163Z" fill="#1D1D1D"></path><path d="M6.15386 10.5712H0V9.03271H6.15386V10.5712Z" fill="#1D1D1D"></path><path d="M7.69292 16.725H1.53906V15.1865H7.69292V16.725Z" fill="#1D1D1D"></path><path d="M9.23003 13.6481H3.07617V12.1096H9.23003V13.6481Z" fill="#1D1D1D"></path></svg>
            )
        },
        {
            _id:1,
            key: "normalDelivery",
            title:"Bir kunda yetkazish",
            svg: (
                <svg width="26" height="20" viewBox="0 0 26 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M25.6408 9.66699L22.8857 3.28914C22.8154 3.12446 22.6978 2.98395 22.5476 2.88512C22.3973 2.78628 22.2211 2.73351 22.0408 2.73336H19.2857V0.91112C19.2857 0.669476 19.189 0.437729 19.0167 0.266861C18.8445 0.0959929 18.6109 0 18.3673 0H0.918367C0.674801 0 0.441211 0.0959929 0.268984 0.266861C0.0967562 0.437729 0 0.669476 0 0.91112V16.4002C0 16.6418 0.0967562 16.8736 0.268984 17.0444C0.441211 17.2153 0.674801 17.3113 0.918367 17.3113H2.88367C3.09516 18.0833 3.55684 18.7649 4.19749 19.2508C4.83814 19.7367 5.62215 20 6.42857 20C7.23499 20 8.01901 19.7367 8.65966 19.2508C9.3003 18.7649 9.76198 18.0833 9.97347 17.3113H15.7408C15.9523 18.0833 16.414 18.7649 17.0546 19.2508C17.6953 19.7367 18.4793 20 19.2857 20C20.0921 20 20.8762 19.7367 21.5168 19.2508C22.1574 18.7649 22.6191 18.0833 22.8306 17.3113H24.7959C25.0395 17.3113 25.2731 17.2153 25.4453 17.0444C25.6175 16.8736 25.7143 16.6418 25.7143 16.4002V10.0223C25.714 9.90019 25.6891 9.77935 25.6408 9.66699ZM19.2857 4.5556H21.4347L23.4 9.1112H19.2857V4.5556ZM6.42857 18.2224C6.0653 18.2224 5.71019 18.1155 5.40814 17.9153C5.10609 17.7151 4.87067 17.4305 4.73165 17.0975C4.59263 16.7645 4.55626 16.3981 4.62713 16.0447C4.698 15.6912 4.87293 15.3665 5.1298 15.1116C5.38668 14.8568 5.71395 14.6832 6.07024 14.6129C6.42653 14.5426 6.79584 14.5787 7.13146 14.7166C7.46708 14.8546 7.75394 15.0881 7.95576 15.3878C8.15758 15.6874 8.26531 16.0398 8.26531 16.4002C8.26531 16.8835 8.07179 17.3469 7.72734 17.6887C7.38288 18.0304 6.9157 18.2224 6.42857 18.2224ZM15.7408 15.489H9.97347C9.76198 14.717 9.3003 14.0354 8.65966 13.5495C8.01901 13.0636 7.23499 12.8003 6.42857 12.8003C5.62215 12.8003 4.83814 13.0636 4.19749 13.5495C3.55684 14.0354 3.09516 14.717 2.88367 15.489H1.83673V1.82224H17.449V13.2659C17.0308 13.5067 16.6646 13.827 16.3715 14.2085C16.0784 14.59 15.8641 15.0252 15.7408 15.489ZM19.2857 18.2224C18.9224 18.2224 18.5673 18.1155 18.2653 17.9153C17.9632 17.7151 17.7278 17.4305 17.5888 17.0975C17.4498 16.7645 17.4134 16.3981 17.4843 16.0447C17.5551 15.6912 17.7301 15.3665 17.9869 15.1116C18.2438 14.8568 18.5711 14.6832 18.9274 14.6129C19.2837 14.5426 19.653 14.5787 19.9886 14.7166C20.3242 14.8546 20.6111 15.0881 20.8129 15.3878C21.0147 15.6874 21.1224 16.0398 21.1224 16.4002C21.1224 16.8835 20.9289 17.3469 20.5845 17.6887C20.24 18.0304 19.7728 18.2224 19.2857 18.2224ZM23.8776 15.489H22.8306C22.6275 14.7087 22.1694 14.0171 21.528 13.5226C20.8866 13.028 20.0981 12.7583 19.2857 12.7557V10.9334H23.8776V15.489Z" fill="#1D1D1D"></path></svg>
            )
        },
        {
            _id:2,
            key:"expressDelivery",
            title: "Tez yetkazib berish",
            svg:(
                <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.81836 9.09009H12.7264V10.9081H1.81836V9.09009Z" fill="#1D1D1D"></path><path d="M0 4.54492H9.09003V6.36293H0V4.54492Z" fill="#1D1D1D"></path><path d="M25.378 9.64089L22.6509 3.27786C22.581 3.11432 22.4645 2.97492 22.316 2.87699C22.1675 2.77906 21.9935 2.72691 21.8156 2.72701H19.0886V0.909003C19.0886 0.66792 18.9928 0.436712 18.8223 0.266241C18.6519 0.0957699 18.4206 0 18.1796 0H3.63551V1.81801H17.2706V13.2314C16.8564 13.472 16.4939 13.7921 16.204 14.1734C15.9141 14.5547 15.7026 14.9896 15.5816 15.4531H9.86946C9.64821 14.5962 9.12205 13.8494 8.38959 13.3527C7.65714 12.856 6.76868 12.6435 5.89075 12.755C5.01282 12.8665 4.2057 13.2944 3.62068 13.9584C3.03565 14.6225 2.71289 15.4771 2.71289 16.3621C2.71289 17.247 3.03565 18.1016 3.62068 18.7657C4.2057 19.4297 5.01282 19.8576 5.89075 19.9691C6.76868 20.0806 7.65714 19.8681 8.38959 19.3714C9.12205 18.8747 9.64821 18.1279 9.86946 17.2711H15.5816C15.7794 18.0512 16.2316 18.7431 16.8668 19.2374C17.5019 19.7316 18.2838 20 19.0886 20C19.8934 20 20.6752 19.7316 21.3104 19.2374C21.9455 18.7431 22.3978 18.0512 22.5955 17.2711H24.5426C24.7837 17.2711 25.0149 17.1753 25.1853 17.0048C25.3558 16.8343 25.4516 16.6031 25.4516 16.3621V9.99903C25.4516 9.87589 25.4266 9.75403 25.378 9.64089V9.64089ZM6.36252 18.1801C6.00296 18.1801 5.65146 18.0734 5.35249 17.8737C5.05352 17.6739 4.8205 17.39 4.6829 17.0578C4.5453 16.7256 4.5093 16.36 4.57945 16.0074C4.6496 15.6547 4.82275 15.3308 5.077 15.0765C5.33125 14.8223 5.65519 14.6491 6.00785 14.579C6.36051 14.5088 6.72605 14.5448 7.05824 14.6824C7.39044 14.82 7.67437 15.0531 7.87414 15.352C8.0739 15.651 8.18053 16.0025 8.18053 16.3621C8.18005 16.8441 7.98835 17.3062 7.64752 17.647C7.30668 17.9879 6.84454 18.1796 6.36252 18.1801V18.1801ZM19.0886 4.54502H21.2156L23.1645 9.09003H19.0886V4.54502ZM19.0886 18.1801C18.729 18.1801 18.3775 18.0734 18.0785 17.8737C17.7796 17.6739 17.5465 17.39 17.4089 17.0578C17.2713 16.7256 17.2353 16.36 17.3055 16.0074C17.3756 15.6547 17.5488 15.3308 17.803 15.0765C18.0573 14.8223 18.3812 14.6491 18.7339 14.579C19.0865 14.5088 19.4521 14.5448 19.7843 14.6824C20.1165 14.82 20.4004 15.0531 20.6002 15.352C20.7999 15.651 20.9066 16.0025 20.9066 16.3621C20.9061 16.8441 20.7144 17.3062 20.3736 17.647C20.0327 17.9879 19.5706 18.1796 19.0886 18.1801ZM23.6336 15.4531H22.5955C22.3953 14.6744 21.9423 13.9843 21.3077 13.4907C20.673 12.9972 19.8925 12.7283 19.0886 12.726V10.908H23.6336V15.4531Z" fill="#1D1D1D"></path></svg>
            )
        }
    ])
    const [typeReception,setTypeReception]=useState(0)

    const [paymentType,setPaymentType]=useState([
        {
            _id:0,
            key:'cash',
            title:'Naqd',
            svg:(
                <svg width="24" height="15" viewBox="0 0 24 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 2C24 0.89543 23.1046 0 22 0H2C0.89543 0 0 0.895431 0 2V13C0 14.1046 0.895431 15 2 15H22C23.1046 15 24 14.1046 24 13V2Z" fill="#4DCFE0"></path><path d="M21.0191 4.63103C20.0955 4.60306 19.3398 3.87535 19.3119 2.95173C19.3119 2.64385 19.06 2.41992 18.7521 2.41992H5.23373C4.92585 2.41992 4.70192 2.64385 4.67396 2.95173C4.61798 3.87535 3.8623 4.60306 2.93867 4.63103C2.6308 4.63103 2.37891 4.88292 2.37891 5.1908V9.44501C2.37891 9.75289 2.6308 10.0048 2.93867 10.0048C3.89026 10.0327 4.64594 10.7605 4.67396 11.6841C4.67396 11.992 4.92585 12.2159 5.23373 12.2159H18.7241C19.032 12.2159 19.2559 11.992 19.2839 11.6841C19.3398 10.7605 20.0955 10.0328 21.0191 10.0048C21.327 10.0048 21.5789 9.75289 21.5789 9.44501V5.1908C21.5789 4.88292 21.327 4.63103 21.0191 4.63103Z" fill="#00BBD3"></path><path d="M18.5564 6.22656C17.9407 6.22656 17.4648 6.70238 17.4648 7.31813C17.4648 7.93388 17.9686 8.40971 18.5564 8.40971C19.1441 8.40971 19.648 7.90592 19.648 7.31813C19.6479 6.73035 19.1722 6.22656 18.5564 6.22656Z" fill="#4DCFE0"></path><path d="M6.4932 7.31813C6.4932 6.7304 6.01738 6.22656 5.40163 6.22656C4.78588 6.22656 4.31006 6.70238 4.31006 7.31813C4.31006 7.93388 4.78588 8.40971 5.40163 8.40971C6.01738 8.40971 6.4932 7.90592 6.4932 7.31813Z" fill="#4DCFE0"></path><path d="M12.6508 5.05172C12.4268 4.99574 12.203 4.96777 11.9511 4.96777C11.6992 4.96777 11.4753 4.99574 11.2514 5.07974C10.4957 5.33163 9.87995 5.94738 9.68404 6.67509C9.62806 6.89902 9.6001 7.1229 9.6001 7.37479C9.6001 7.62668 9.62806 7.85061 9.71206 8.07449C9.96395 8.83017 10.5797 9.44592 11.3074 9.64183C11.5313 9.69781 11.7552 9.72577 12.0071 9.72577C12.259 9.72577 12.4829 9.69781 12.7068 9.61381C13.4625 9.36192 14.0782 8.74617 14.2742 8.01845C14.3301 7.79452 14.3581 7.57065 14.3581 7.31876C14.3581 7.06686 14.3301 6.84293 14.2461 6.61906C13.9942 5.86338 13.3785 5.24763 12.6508 5.05172Z" fill="#D4E1F4"></path></svg>
            )
        },
        {
            _id: 1,
            key:"terminal",
            title:"Terminal",
            svg: (
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" rx="2" fill="url(#paint0_linear)"></rect><path d="M1 3.22656H23.2609V5.96884H1V3.22656Z" fill="url(#paint1_linear)"></path><path d="M11.0013 10.5662H4.46817C4.02273 10.5662 3.66162 10.2051 3.66162 9.75968C3.66162 9.31423 4.02273 8.95312 4.46817 8.95312H11.0013C11.4467 8.95312 11.8078 9.31423 11.8078 9.75968C11.8078 10.2051 11.4467 10.5662 11.0013 10.5662Z" fill="#B9ACAC"></path><defs><linearGradient id="paint0_linear" x1="16.3752" y1="23.91" x2="26.9289" y2="0.971786" gradientUnits="userSpaceOnUse"><stop stopColor="#8F86C0"></stop><stop offset="1" stopColor="#C7C3DF"></stop></linearGradient><linearGradient id="paint1_linear" x1="56.6213" y1="11.6185" x2="56.8139" y2="-1.06985" gradientUnits="userSpaceOnUse"><stop stopColor="#816A6A"></stop><stop offset="1" stopColor="#9D8B8B"></stop></linearGradient></defs></svg>
            )
        },
        {
            _id: 2,
            key:'apelsin',
            title: "Apelsin",
            svg: (
                <img src={apelsin} alt=""/>
            )
        }
    ])
    const [paymentId,setPaymentId]=useState(0)
    const [comment,setComment]=useState('')


    const cart = useSelector((state:any) => state.cartReducer.cart)

    const addCart=cart.map((item:any)=>{
        return{
            productId:item._id,
            quantity:item.quantity
        }
    })

    const defaultList = useSelector((state: RootState) => state.user)
    const {status}=defaultList
    const {list}=defaultList
    const {user}=list

    useEffect(()=>{
        setFullName(user.fullName || "")
        setPhone(`+${user.phone}` || "")
        setLocus(user.locus || "")
    },[])

    const getQ = (id:any) => {
        const filterArr=cart.filter((el:any)=>el._id===id)
        return filterArr[0].quantity
    }
    const overSum=allSum()
    const handleOrder = (e:ChangeEvent<HTMLFormElement>) => {
      e.preventDefault()

      axios.post(`${baseUrl}orders`,
          {
              products:addCart,
              receptionType:typeReception,
              paymentType:paymentId,
              comment,
              allSum:overSum,
              phone:Number(phone.slice(1)),
              fullName,
              locus
            },
          {headers:{"Authorization":`Bearer ${TOKEN}`}}
      )
          .then((res)=>{
              // console.log(res)
              if (res.status==201){
                  toast.success(res?.data?.message)
                  dispatch(removeAllItem())
                  navigate('/orders')
              }
          })
          .catch((err)=>{
              console.log(err)
          })
    }
    return (
        <section className={"payment"}>
            <div className="container">
                <h1 className={"payment_title"}>To'lov</h1>
                <div className="row">
                    <div className="left">
                        <p className={"line"}/>
                        <form onSubmit={handleOrder}>
                            <div className="payment_section">
                                <p className={"payment_list_title"}>Qabul qilish usuli</p>
                                <div className="payment_grid">
                                    {
                                        reception.map((item)=>{
                                            return(
                                                <div onClick={()=>{
                                                     setTypeReception(item._id)
                                                }} key={item._id} className={typeReception===item._id?"col_4 active":"col_4"}>
                                                    <h6>{item.title}</h6>
                                                    {item.svg}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="payment_section">
                                <input value={fullName} disabled required placeholder={"Ism va Familiya"} type="text"/>
                                <input value={phone} required placeholder={"Telefon raqam"} disabled type="text"/>
                                <input value={comment} onChange={event => setComment(event.target.value)} placeholder={"Buyurtmaga izoh(talab qilinmaydi)"} type="text"/>
                                {typeReception !==0 &&<input value={locus} onChange={event => setLocus(event.target.value)} placeholder={"Yetkazish manzili"} type="text"/>}
                            </div>
                            <div className="payment_section">
                                <p className={"payment_list_title"}>To'lov usuli</p>
                                <div className="payment_grid">
                                    {paymentType.map((item)=>{
                                        return(
                                            <div onClick={()=>{
                                                setPaymentId(item._id)
                                            }} key={item._id} className={paymentId===item._id?"col_4 active":"col_4"}>
                                                <h6>{item.title}</h6>
                                                {item.svg}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <button>Buyurtmani tasdiqlash</button>
                        </form>

                    </div>
                    <div className="right">
                        <div className="card">
                            <div className="card_body">
                                <div className="cb_header">
                                    <p>Buyurtmangiz</p>
                                    <NavLink to={"/cart"}>Tahrirlash</NavLink>
                                </div>
                                <div className="cb_info">
                                    <p>Mahsulotlar ({allQuantity() || 0})</p>
                                    <p>{priceToString(allSum())} so'm</p>
                                </div>
                                <div className="cb_info">
                                    <p>Yetkazib berish</p>
                                    <p>{typeReception===1?priceToString(30000):typeReception===2?priceToString(50000):0} so'm</p>
                                </div>
                                <div className="cb_info">
                                    <p>Chegirma</p>
                                    <p>0 so'm</p>
                                </div>
                                <div className="total_price">
                                    <p>Umumiy</p>
                                    <p>{typeReception===1?priceToString(allSum()+30000):typeReception===2?priceToString(allSum()+50000):priceToString(allSum())} so'm</p>
                                </div>
                                <div>
                                    <div className="total_price">
                                        <p>Buyurtma ro'yxati</p>
                                    </div>
                                    <div className="c_wrapper">
                                        {
                                            cart.map((item:CartItem,i:number)=>{
                                                const linkName=item.title.split(' ').join('-').replace("/","-")
                                                return(
                                                    <div key={i} className="c_inner">
                                                        <div>
                                                            <img src={`http://localhost:5000/images/${item.images[0]}`}
                                                                 alt={item.title}/>
                                                        </div>
                                                        <div className="c_details">
                                                            <div className={"product_title"}>{item.title}</div>
                                                            <div className="product_quantity">
                                                                {getQ(item._id)}ta
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
