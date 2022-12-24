import React, {CSSProperties, FormEvent, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import {baseUrl} from "../../../Redux/variable";
import {toast} from "react-toastify";

const override: CSSProperties = {
    marginRight: "10px",
    borderColor:"#fff"
};

const Login = () => {
    const navigate=useNavigate()
    const [typeInput,setTypeInput]=useState(true)
    const [login,setLogin]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState<boolean>(false)
    let [color, setColor] = useState("#ffffff");

    const loginSubmit = (e:FormEvent<HTMLFormElement>) => {
        setLoading(true)
      e.preventDefault()
        axios.post(`${baseUrl}login`,{
            login,
            password
        })
            .then((res)=>{
               if (res?.data?.token.length>10) {
                   localStorage.setItem('admin',res?.data?.token)
                   toast.success('You have successfully logged in')
                   navigate('/dashboard/main?category')
                   window.location.reload();
               }
            })
            .catch((err)=>{
                toast.error(err?.response?.data?.message)
            })
            .finally(()=>{
                setLoading(false)
            })
    }
    return (
        <section className={"dashboard_login"}>
           <div className="container">
               <div className="logo">
                   <Link to={"/"}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                            className="bi bi-apple" viewBox="0 0 16 16">
                           <path
                               d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
                           <path
                               d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
                       </svg>
                       <span>AppleUz</span>
                   </Link>
               </div>
               <div className="form_group">

                   <form onSubmit={loginSubmit}>
                       <h1>Tizimga kirish</h1>
                       <input maxLength={20} minLength={4} required value={login} onChange={event => setLogin(event.target.value)} type="text"/>
                      <div className={'password'}>
                          <input maxLength={20} minLength={4} required value={password} onChange={event => setPassword(event.target.value)} type={typeInput?'password':"text"}/>
                          {password.length>=1&&<div className={'eye'}>
                              {typeInput ?
                                  <svg onClick={() => setTypeInput(!typeInput)} xmlns="http://www.w3.org/2000/svg"
                                       width="16" height="16" fill="currentColor"
                                       className="bi bi-eye-fill" viewBox="0 0 16 16">
                                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                      <path
                                          d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                  </svg>
                                  :
                                  <svg onClick={() => setTypeInput(!typeInput)} xmlns="http://www.w3.org/2000/svg"
                                       width="16" height="16" fill="currentColor"
                                       className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                      <path
                                          d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                      <path
                                          d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                  </svg>
                              }

                          </div>}
                      </div>
                       <button disabled={loading}>
                           <ClipLoader
                               color={color}
                               loading={loading}
                               cssOverride={override}
                               size={20}
                               aria-label="Loading Spinner"
                               data-testid="loader"
                           />
                           Kirish
                       </button>
                   </form>
               </div>
           </div>
        </section>
    );
};

export default Login;
