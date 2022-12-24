import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ADMINTOKEN, baseUrl} from "../../../Redux/variable";
import person from '../../../assets/user.png'
import SectionLoad from "../../SectionLoad";
import Modal from "react-modal";
import {toast} from "react-toastify";

type Users={
    _id:string,
    phone:number,
    salary?:number,
    fullName:string,
    image?:string,
    locus?:string,
    passportId?:string,
    workLocus?:string,
    createdAt:string,
    updatedAt:string,
    __v:boolean
}[]

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        maxWidth:"500px",
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const UsersDashboard = () => {
    const [pageLoad,setPageLoad]=useState<boolean>(true)
    const [data,setData]=useState<Users>([])
    const [deleteModal,setDeleteModal]=useState(false)
    const [user,setUser]=useState<any>({})

    useEffect(()=>{
        getAllUsers()
    },[])

    const getAllUsers = () => {
        axios.get(`${baseUrl}user`,{headers:{'Authorization':`Bearer ${ADMINTOKEN}`}})
            .then((res)=>{
                setData(res?.data?.users)
                console.log(res?.data?.users)
            })
            .catch((e)=>{
                console.log(e)
            })
            .finally(()=>{
                setPageLoad(false)
            })
    }

    const onCloseModal = () => {
        setDeleteModal(false)
    }

    const deleteModalFunc = (id:string) => {
        setPageLoad(true)
        axios.delete(`${baseUrl}user/${id}`,
            {headers:{'Authorization':`Bearer ${ADMINTOKEN}`}})
            .then((res)=>{
                console.log(res)
                if (res.status===200){
                    getAllUsers()
                    toast.success(res.data.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        onCloseModal()
    }
    return (
        <section className={'user_d p_relative h-100'}>
            <div className="table_div">
                <table>
                    <thead>
                        <tr>
                            <th>T/r</th>
                            <th>Image</th>
                            <th>FullName</th>
                            <th>Locus</th>
                            <th>PassportId</th>
                            <th>Salary</th>
                            <th>WorkLocus</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item,i)=>{
                        return(
                            <tr key={item._id}>
                                <td>{i+1}</td>
                                <td>
                                    {item.image && item?.image?.length>=2
                                        ?
                                        <img className={"user_img_table"} src={`http://localhost:5000/images/${item.image}`} alt=""/>
                                        :
                                        <img className={"user_img_table"} src={person} alt=""/>
                                    }

                                </td>
                                <td><p>{item.fullName}</p></td>
                                <td><p>{item.locus&&item.locus?.length>=1?item.locus:'-'}</p></td>
                                <td>{item.passportId&&item.passportId?.length>=1?item.passportId:'-'}</td>
                                <td>{item.salary&&item.salary>=1?item.salary:'-'}</td>
                                <td>{item.workLocus&&item.workLocus?.length>=1?item.workLocus:'-'}</td>
                                <td>{item.phone&&item.phone>=1?item.phone:'-'}</td>
                                <td className={"buttons"}>
                                    {/*<button  className={"edit"}>*/}
                                    {/*    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                                    {/*         className="bi bi-pencil-fill" viewBox="0 0 16 16">*/}
                                    {/*        <path*/}
                                    {/*            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>*/}
                                    {/*    </svg>*/}
                                    {/*</button>*/}
                                    <button onClick={()=>{
                                        setDeleteModal(!deleteModal)
                                        setUser(item)
                                    }} className={"delete"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={deleteModal}
                onRequestClose={onCloseModal}
                style={customStyles}
            >
                <div className="deleteModal">
                    <p>Haqiqatdan ham ushbu user({user?.fullName}) ni o'chirishni xoxlayszmi?</p>
                    <div className="buttons">
                        <button onClick={()=>deleteModalFunc(user?._id)} className={'yes'}>Ha</button>
                        <button onClick={()=>onCloseModal()} className={'no'}>Yo'q</button>
                    </div>
                </div>
            </Modal>
            <SectionLoad loading={pageLoad}/>
        </section>
    );
};

export default UsersDashboard;
