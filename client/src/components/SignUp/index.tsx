import React,{useState,CSSProperties} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import axios from 'axios';
import { baseUrl } from '../../Redux/variable';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
        marginRight: "10px",
        borderColor:"#fff"
  };





const SignUp = () => {
    const [phoneVal, setPhoneVal] = useState<any>('')
    const navigate=useNavigate()
    const [loading,setLoading]=useState<boolean>(false)
    let [color, setColor] = useState("#ffffff");


    const schema = yup.object().shape({
        fullName: yup.string().required("Your Full Name is Required!"),
        // phone: yup.number().positive().integer().min(9).required(),
        // phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        password: yup.string().min(4).max(20).required(),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords Don't Match")
          .required(),
      });

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
    
      const onSubmit = (data:any) => {
        setLoading(true)
        if(phoneVal.length<12) toast.error("Telefon raqam noto'g'ri")
        delete data.confirmPassword
        axios.post(`${baseUrl}user/signup`,{
            ...data,
            phone:Number(phoneVal.slice(1))
        })
        .then((res)=>{
                       
            localStorage.setItem('token',res?.data?.token)
            if(res?.data?.token?.length>2){ 
                navigate('/profile')
                window.location.reload();
            }
        })
        .catch((err)=>{
            console.log(err);
            toast.error(err?.response?.data?.message)
        })
        .finally(()=>{
            setLoading(false)
        })
      };  
      
    
    return (
        <section className={"sign_in"}>
            <div className="container">
                <div className="sign_center">
                    <h1>AppleUz dan ro'yxatdan o'tish</h1>
                    <div className="sign_form_div">
                        <form onSubmit={handleSubmit(onSubmit)}>
                           
                            <div className={`phone-input-wrapper`}>
                           
                                <PhoneInput

                                    international
                                    limitMaxLength={true}
                                    value={phoneVal}
                                    onChange={setPhoneVal}
                                    defaultCountry={"UZ"}
                                    // name="phone"
                                    autoComplete='off'
                                    disabled={false}
                                    placeholder={"*Telefon raqam"}
                                />
                            {/* {error && <span className="error-text">{error}</span>} */}
                        </div>
                            <span>
                                <>{errors.fullName?.message}</>
                            </span>
                            <input className='input' required type="text" placeholder={"*Ism va Familiya"} {...register("fullName")}/>
                            
                            <span>
                                 <>{errors?.password?.message}</>
                            </span>
                            <input
                                className='input'
                                type="password"
                                placeholder="*password..."
                                {...register("password")}
                            />

                            
                            <span>
                                <>{errors.confirmPassword?.message}</>
                             </span>
                            <input
                                className='input'
                                type="*password"
                                placeholder="Confirm Password..."
                                {...register("confirmPassword")}
                            />
                             
                            <button disabled={loading}>
                                {loading&&<ClipLoader
                                    color={color}
                                    loading={loading}
                                    cssOverride={override}
                                    size={20}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />}
                                Ro'yxatdan o'tish
                            </button>
                            <Link to={"/signin"}>Accountingiz bormi? Kirish</Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
