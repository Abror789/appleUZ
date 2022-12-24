import React, {ChangeEvent, useEffect, useState,CSSProperties} from 'react';
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import {useSelector} from "react-redux";
import {RootState} from "../../Redux/store";
import PageLoad from "../PageLoad";
import axios from "axios";
import {baseUrl} from "../../Redux/variable";
import ClipLoader from "react-spinners/ClipLoader";
import {toast} from "react-toastify";

const override: CSSProperties = {
    marginRight: "10px",
    borderColor:"#fff"
};

const Service = () => {

    const defaultList = useSelector((state: RootState) => state.user)
    const {status}=defaultList
    const {list}=defaultList
    const {user}=list

    const [fullName,setFullName]=useState('')
    const [phoneNumber,setPhoneNumber]=useState<any>('')
    const [device,setDevice]=useState('')
    const [desc,setDesc]=useState('')
    const [loading,setLoading]=useState<boolean>(false)
    let [color, setColor] = useState("#ffffff");

    useEffect(()=>{
       setFullName(user?.fullName || '')
       setPhoneNumber(`+${user?.phone}` || '')
    },[])

    const handleService = (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${baseUrl}service`,{
            fullName,
            phoneNumber:Number(phoneNumber.slice(1)),
            device,
            desc
        })
            .then((res)=>{
                console.log(res)
                if (res.status===201){
                    toast.success(res.data.message)
                    setDevice('')
                    setDesc('')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                setLoading(false)
            })
    }

    return (
        <>
            {status==='success'
                ?
                <section className={"service"}>
                    <div className="container">
                        <div className={"row"}>
                            <div className={"col_six"}>
                                <form onSubmit={handleService}>
                                    <h1>Sizga qanday yordam bera olamiz?</h1>
                                    <div>
                                        <label>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M10.75 7.0595L9.00851 6L10.75 4.9405C10.9312 4.83199 11.0889 4.6885 11.214 4.51838C11.3391 4.34826 11.4291 4.15494 11.4787 3.94967C11.5284 3.74441 11.5366 3.53133 11.503 3.32285C11.4694 3.11437 11.3946 2.91467 11.283 2.7354C11.1713 2.55613 11.0252 2.40089 10.8529 2.27872C10.6807 2.15655 10.4858 2.0699 10.2797 2.02383C10.0736 1.97777 9.86045 1.9732 9.65258 2.0104C9.44471 2.0476 9.24633 2.12582 9.06901 2.2405L7.50001 3.245V1.5C7.50001 1.10218 7.34198 0.720644 7.06067 0.43934C6.77937 0.158035 6.39784 0 6.00001 0C5.60219 0 5.22065 0.158035 4.93935 0.43934C4.65805 0.720644 4.50001 1.10218 4.50001 1.5V3.294L2.93101 2.2405C2.5732 2.02619 2.14552 1.961 1.74011 2.05899C1.3347 2.15697 0.984 2.41028 0.76356 2.76435C0.543119 3.11842 0.470579 3.54491 0.561568 3.95195C0.652556 4.35899 0.899791 4.714 1.25001 4.9405L2.99151 6L1.25001 7.0595C0.899791 7.286 0.652556 7.64101 0.561568 8.04805C0.470579 8.45509 0.543119 8.88158 0.76356 9.23565C0.984 9.58972 1.3347 9.84303 1.74011 9.94101C2.14552 10.039 2.5732 9.97381 2.93101 9.7595L4.50001 8.7405V10.5C4.50001 10.8978 4.65805 11.2794 4.93935 11.5607C5.22065 11.842 5.60219 12 6.00001 12C6.39784 12 6.77937 11.842 7.06067 11.5607C7.34198 11.2794 7.50001 10.8978 7.50001 10.5V8.71L9.06901 9.76C9.42682 9.97431 9.8545 10.0395 10.2599 9.94151C10.6653 9.84353 11.016 9.59022 11.2365 9.23615C11.4569 8.88208 11.5294 8.45559 11.4385 8.04855C11.3475 7.64151 11.1002 7.2865 10.75 7.06V7.0595Z" fill="#FF3B30"></path></svg>
                                            Ism va familiya
                                        </label>
                                        <input value={fullName} onChange={event => setFullName(event.target.value)} required type={"text"}/>
                                    </div>
                                    <div>
                                        <label>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M10.75 7.0595L9.00851 6L10.75 4.9405C10.9312 4.83199 11.0889 4.6885 11.214 4.51838C11.3391 4.34826 11.4291 4.15494 11.4787 3.94967C11.5284 3.74441 11.5366 3.53133 11.503 3.32285C11.4694 3.11437 11.3946 2.91467 11.283 2.7354C11.1713 2.55613 11.0252 2.40089 10.8529 2.27872C10.6807 2.15655 10.4858 2.0699 10.2797 2.02383C10.0736 1.97777 9.86045 1.9732 9.65258 2.0104C9.44471 2.0476 9.24633 2.12582 9.06901 2.2405L7.50001 3.245V1.5C7.50001 1.10218 7.34198 0.720644 7.06067 0.43934C6.77937 0.158035 6.39784 0 6.00001 0C5.60219 0 5.22065 0.158035 4.93935 0.43934C4.65805 0.720644 4.50001 1.10218 4.50001 1.5V3.294L2.93101 2.2405C2.5732 2.02619 2.14552 1.961 1.74011 2.05899C1.3347 2.15697 0.984 2.41028 0.76356 2.76435C0.543119 3.11842 0.470579 3.54491 0.561568 3.95195C0.652556 4.35899 0.899791 4.714 1.25001 4.9405L2.99151 6L1.25001 7.0595C0.899791 7.286 0.652556 7.64101 0.561568 8.04805C0.470579 8.45509 0.543119 8.88158 0.76356 9.23565C0.984 9.58972 1.3347 9.84303 1.74011 9.94101C2.14552 10.039 2.5732 9.97381 2.93101 9.7595L4.50001 8.7405V10.5C4.50001 10.8978 4.65805 11.2794 4.93935 11.5607C5.22065 11.842 5.60219 12 6.00001 12C6.39784 12 6.77937 11.842 7.06067 11.5607C7.34198 11.2794 7.50001 10.8978 7.50001 10.5V8.71L9.06901 9.76C9.42682 9.97431 9.8545 10.0395 10.2599 9.94151C10.6653 9.84353 11.016 9.59022 11.2365 9.23615C11.4569 8.88208 11.5294 8.45559 11.4385 8.04855C11.3475 7.64151 11.1002 7.2865 10.75 7.06V7.0595Z" fill="#FF3B30"></path></svg>
                                            Telefon raqam
                                        </label>
                                        <div className="phone_input">
                                            <PhoneInput

                                                international
                                                limitMaxLength={true}
                                                value={phoneNumber}
                                                onChange={setPhoneNumber}
                                                defaultCountry={"UZ"}
                                                // name="phone"
                                                autoComplete='off'
                                                disabled={false}
                                                placeholder={"*Telefon raqam"}
                                            />
                                        </div>
                                        {/*<input placeholder='+9989XYYYYYYY' type={'tel'}  max={13} required pattern='^\+998 [0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}$'/>*/}
                                    </div>
                                    <div>
                                        <label>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M10.75 7.0595L9.00851 6L10.75 4.9405C10.9312 4.83199 11.0889 4.6885 11.214 4.51838C11.3391 4.34826 11.4291 4.15494 11.4787 3.94967C11.5284 3.74441 11.5366 3.53133 11.503 3.32285C11.4694 3.11437 11.3946 2.91467 11.283 2.7354C11.1713 2.55613 11.0252 2.40089 10.8529 2.27872C10.6807 2.15655 10.4858 2.0699 10.2797 2.02383C10.0736 1.97777 9.86045 1.9732 9.65258 2.0104C9.44471 2.0476 9.24633 2.12582 9.06901 2.2405L7.50001 3.245V1.5C7.50001 1.10218 7.34198 0.720644 7.06067 0.43934C6.77937 0.158035 6.39784 0 6.00001 0C5.60219 0 5.22065 0.158035 4.93935 0.43934C4.65805 0.720644 4.50001 1.10218 4.50001 1.5V3.294L2.93101 2.2405C2.5732 2.02619 2.14552 1.961 1.74011 2.05899C1.3347 2.15697 0.984 2.41028 0.76356 2.76435C0.543119 3.11842 0.470579 3.54491 0.561568 3.95195C0.652556 4.35899 0.899791 4.714 1.25001 4.9405L2.99151 6L1.25001 7.0595C0.899791 7.286 0.652556 7.64101 0.561568 8.04805C0.470579 8.45509 0.543119 8.88158 0.76356 9.23565C0.984 9.58972 1.3347 9.84303 1.74011 9.94101C2.14552 10.039 2.5732 9.97381 2.93101 9.7595L4.50001 8.7405V10.5C4.50001 10.8978 4.65805 11.2794 4.93935 11.5607C5.22065 11.842 5.60219 12 6.00001 12C6.39784 12 6.77937 11.842 7.06067 11.5607C7.34198 11.2794 7.50001 10.8978 7.50001 10.5V8.71L9.06901 9.76C9.42682 9.97431 9.8545 10.0395 10.2599 9.94151C10.6653 9.84353 11.016 9.59022 11.2365 9.23615C11.4569 8.88208 11.5294 8.45559 11.4385 8.04855C11.3475 7.64151 11.1002 7.2865 10.75 7.06V7.0595Z" fill="#FF3B30"></path></svg>
                                            Qurilma rusumi
                                        </label>
                                        <input value={device} onChange={event => setDevice(event.target.value)} type={"text"} required/>
                                    </div>
                                    <div>
                                        <label>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M10.75 7.0595L9.00851 6L10.75 4.9405C10.9312 4.83199 11.0889 4.6885 11.214 4.51838C11.3391 4.34826 11.4291 4.15494 11.4787 3.94967C11.5284 3.74441 11.5366 3.53133 11.503 3.32285C11.4694 3.11437 11.3946 2.91467 11.283 2.7354C11.1713 2.55613 11.0252 2.40089 10.8529 2.27872C10.6807 2.15655 10.4858 2.0699 10.2797 2.02383C10.0736 1.97777 9.86045 1.9732 9.65258 2.0104C9.44471 2.0476 9.24633 2.12582 9.06901 2.2405L7.50001 3.245V1.5C7.50001 1.10218 7.34198 0.720644 7.06067 0.43934C6.77937 0.158035 6.39784 0 6.00001 0C5.60219 0 5.22065 0.158035 4.93935 0.43934C4.65805 0.720644 4.50001 1.10218 4.50001 1.5V3.294L2.93101 2.2405C2.5732 2.02619 2.14552 1.961 1.74011 2.05899C1.3347 2.15697 0.984 2.41028 0.76356 2.76435C0.543119 3.11842 0.470579 3.54491 0.561568 3.95195C0.652556 4.35899 0.899791 4.714 1.25001 4.9405L2.99151 6L1.25001 7.0595C0.899791 7.286 0.652556 7.64101 0.561568 8.04805C0.470579 8.45509 0.543119 8.88158 0.76356 9.23565C0.984 9.58972 1.3347 9.84303 1.74011 9.94101C2.14552 10.039 2.5732 9.97381 2.93101 9.7595L4.50001 8.7405V10.5C4.50001 10.8978 4.65805 11.2794 4.93935 11.5607C5.22065 11.842 5.60219 12 6.00001 12C6.39784 12 6.77937 11.842 7.06067 11.5607C7.34198 11.2794 7.50001 10.8978 7.50001 10.5V8.71L9.06901 9.76C9.42682 9.97431 9.8545 10.0395 10.2599 9.94151C10.6653 9.84353 11.016 9.59022 11.2365 9.23615C11.4569 8.88208 11.5294 8.45559 11.4385 8.04855C11.3475 7.64151 11.1002 7.2865 10.75 7.06V7.0595Z" fill="#FF3B30"></path></svg>
                                            Sizga qanday xizmat kerak?
                                        </label>
                                        <input value={desc} onChange={event => setDesc(event.target.value)} type={"text"} required/>
                                    </div>
                                    {/*<div>*/}
                                    {/*    <label>*/}
                                    {/*        Qo'shimcha izohlar*/}
                                    {/*    </label>*/}
                                    {/*    <input type={"text"}/>*/}
                                    {/*</div>*/}
                                    <button disabled={loading} type={"submit"}>
                                        {loading&&<ClipLoader
                                            color={color}
                                            loading={loading}
                                            cssOverride={override}
                                            size={20}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />}
                                        Davom etish
                                    </button>
                                </form>
                            </div>
                            <div className={"col_six"}>
                                <img  width="100%"  src={"https://macbro.uz/_next/static/image/public/images/Service.fe552bc774ec9e65ed841da54b2f6c42.jpg"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"map"}>
                        <iframe style={{zIndex: '1'}} src="https://yandex.ru/sprav/widget/rating-badge/69859412482" height="50"
                                width="150" frameBorder="0"></iframe>
                        <iframe src="https://yandex.ru/map-widget/v1/?z=12&amp;ol=biz&amp;oid=69859412482" height="100%"
                                width="100%" frameBorder="0"></iframe>
                    </div>
                </section>
                :
                <PageLoad/>
            }

        </>
    );
};

export default Service;
