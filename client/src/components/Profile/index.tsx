import React, {useState, FormEvent, useEffect, ChangeEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { RootState } from '../../Redux/store'
import userLogo from '../../../src/assets/user.png'
import {baseUrl, fileUrl, TOKEN} from '../../Redux/variable';
import { priceToString } from '../../utils/price';
import PageLoad from '../PageLoad';
import axios from "axios";
import {getUser} from "../../Redux/features/user/userSlice";

const Profile = () => {
    const dispatch=useDispatch<any>()
    const navigate=useNavigate()

    const [userId,setUserId]=useState<any>('')
    const [fullName,setFullName]=useState<any>('')
    const [phone,setPhone]=useState<any>('')
    const [locus,setLocus]=useState<any>('')
    const [passportId,setPassportId]=useState<any>('')
    const [salary,setSalary]=useState<any>('')
    const [workLocus,setWorkLocus]=useState<any>('')
    const [image,setImage]=useState<any>('')

    const defaultList = useSelector((state: RootState) => state.user)
    const {status}=defaultList
    const {list}=defaultList
    const {user}=list

    useEffect(()=>{
      setUserId(user._id)
      setFullName(user.fullName)
      setPhone(user.phone)
      setLocus(user.locus || '')
      setPassportId(user.passportId || '')
      setSalary(user.salary || '')
      setWorkLocus(user.workLocus || '')
      setImage(fileUrl+user.image)
    },[])



    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () =>{
      setOpen(false);
      setImage(fileUrl+user.image)
    }




    const logOut=()=>{
      localStorage.removeItem('token')
      navigate('/')
      window.location.reload();

    }
    const [profileImage,setProfileImage]=useState<any>("")


    const handleImage=(files:any)=>{

      // console.log(files[0]);

      if(files.length !== 0){
          setProfileImage(files[0])
          setImage(URL.createObjectURL(files[0]));
      }
    }

    const editUser = (e:ChangeEvent<HTMLFormElement>) => {

        e.preventDefault()
        const formData=new FormData()
        formData.append('image',profileImage)
        formData.append('salary',salary)
        formData.append('workLocus',workLocus)
        formData.append('locus',locus)
        formData.append('passportId',passportId)
        formData.append('fullName',fullName)
        axios.patch(`${baseUrl}user/${userId}`,formData,{
            headers:{
                'Authorization':`Bearer ${TOKEN}`
            }
        })
            .then((res)=>{
                if (res.status===201){
                    setOpen(false)
                    dispatch(getUser(TOKEN))
                }
                // console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
    }



    return (
      <>
        {status==='success'?
        <>
          <section className='profile'>
            <div className="container">
              <div className="profile_title">
                <h1>Salom, <strong>{user?.fullName}</strong></h1>
              </div>
              <div className="col_8">
                <div className="card">
                  <div className="card_header">
                    <span>Hisob qaydnoma sozlamalar</span>
                    <div className="profile_actions">
                      <button onClick={onOpenModal} >Tahrirlash</button>
                      <button onClick={logOut}>Chiqish</button>
                    </div>
                  </div>
                  <div className="card_body">
                    <div className="avatar_main">
                      <div className="avatar">
                        <img src={image.includes('undefined')?userLogo:image} alt="user" />
                      </div>
                    </div>
                    <div className="profile_grid">
                      <div className='person_info'>
                        <div>Ism va Familiya</div>
                        <div>{user.fullName}</div>
                      </div>
                      <div className='person_info'>
                        <div>Telefon raqam</div>
                        <div>+{user.phone}</div>
                      </div>
                    {user.locus && <div className='person_info'>
                        <div>Yashash joyi</div>
                        <div>{user.locus}</div>
                      </div>}
                      {user.passportId && <div className='person_info'>
                        <div>Passport ID</div>
                        <div>{user.passportId}</div>
                      </div>}
                      {user.workLocus && <div className='person_info'>
                        <div>Ish joyi</div>
                        <div>{user.workLocus}</div>
                      </div>}
                      {user.salary && <div className='person_info'>
                        <div>O'rtacha oylik maoshi</div>
                        <div>{priceToString(user.salary)} so'm</div>
                      </div>}
                    </div>
                      <div className="profile_actions">
                          <button onClick={onOpenModal} >Tahrirlash</button>
                          <button onClick={logOut}>Chiqish</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Modal open={open} onClose={onCloseModal} center>
            <div className='edit_profile'>
                <h2>Hisob qaydnomangizni tahrirlang</h2>
                <p>Ushbu ma'lumotdagi o'zgarishlar sizning AppleUz hisob qaydnomangizga tegishli bo'lib, keyingi xaridlaringizga ta'sir qiladi.</p>
                <div className="avatar">
                  <input onChange={(e)=>{handleImage(e.target.files)}} type="file" id='avatar' accept='image/png, image/jpg' />
                  <img src={image.includes('undefined')?userLogo:image} alt="user" />
                  <label htmlFor={"avatar"} className='avatar_plus'>+</label>
                </div>
                <form onSubmit={editUser}>
                    <input value={fullName} onChange={event => setFullName(event.target.value)} type="text" placeholder='Ism va Familiya'/>
                    <input value={passportId} onChange={event => setPassportId(event.target.value)} type="text" placeholder='Pasport ID'/>
                    <input value={locus} onChange={event => setLocus(event.target.value)} type="text" placeholder='Yashash joyi' />
                    <input value={workLocus} onChange={event => setWorkLocus(event.target.value)} type="text" placeholder='ish joyi' />
                    <input value={salary} onChange={event => setSalary(event.target.value)} type="text" placeholder="O'rtacha oylik maoshi(so'mda)" />
                    <div className="buttons">
                        <button type='button' onClick={onCloseModal}>
                            Bekor qilish
                        </button>
                        <button type='submit'>
                            Saqlash
                        </button>
                    </div>
                </form>
            </div>
          </Modal>
        </>
        :
        <>
          <PageLoad/>
        </>}
      </>

  )
}

export default Profile
