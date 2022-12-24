import React, {ChangeEvent, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../../Redux/variable";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { toast } from 'react-toastify';
import PageLoad from "../PageLoad";



const SignIn = () => {
    const [phoneVal, setPhoneVal] = useState<any>('')
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)

    const schema = yup.object().shape({
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
        delete data.confirmPassword
        axios.post(`${baseUrl}user/signin`,{
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
      };
    return (
        <section className={"sign_in"}>
                   <div className="container">
                       <div className="sign_center">
                           <h1>Kirish</h1>
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
                                           placeholder={"Telefon raqam"}
                                       />
                                   </div>

                                   <span>
                                <>{errors?.password?.message}</>
                           </span>
                                   <input
                                       className='input'
                                       type="password"
                                       placeholder="Password..."
                                       {...register("password")}
                                   />


                                   <span>
                               <>{errors.confirmPassword?.message}</>
                            </span>
                                   <input
                                       className='input'
                                       type="password"
                                       placeholder="Confirm Password..."
                                       {...register("confirmPassword")}
                                   />

                                   <button>Kirish</button>
                                   <Link to={"/signup"}>Accountingiz yo'qmi? Ro'yhatdan o'ting</Link>
                               </form>
                           </div>
                       </div>
                   </div>
               </section>
    );
};

export default SignIn;
