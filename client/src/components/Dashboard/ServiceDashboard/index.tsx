import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from "axios";
import {ADMINTOKEN, baseUrl} from "../../../Redux/variable";
import SectionLoad from "../../SectionLoad";
import {toast} from "react-toastify";
import Modal from "react-modal";

type Service={
    _id:string,
    fullName:string,
    device:string,
    desc:string,
    phoneNumber:number,
    isChecked:boolean,
    createdAt:string,
    updatedAt:string,
    __v:boolean
}[]

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const ServiceDashboard = () => {
    const [pageLoad,setPageLoad]=useState<boolean>(true)
    const [data,setData]=useState<Service>([])
    const [deleteModal,setDeleteModal]=useState(false)
    const [service,setService]=useState<any>({})

    const onCloseModal = () => {
        setDeleteModal(false)
    }

    const getAllServices = () => {
        axios.get(`${baseUrl}service`,{headers:{'Authorization':`Bearer ${ADMINTOKEN}`}})
            .then((res)=>{
                setData(res?.data?.services)
            })
            .catch((e)=>{
                console.log(e)
            })
            .finally(()=>{
                setPageLoad(false)
            })
    }
    useEffect(()=>{
        getAllServices()
    },[])


    const editShow = (e:ChangeEvent<HTMLInputElement>,id:string) => {
        setPageLoad(true)

        axios.patch(`${baseUrl}service/${id}`,
            {isChecked:e.target.checked},
            {headers:{'Authorization':`Bearer ${ADMINTOKEN}`}})
            .then((res)=>{
                console.log(res)
                getAllServices()
                toast.success(res?.data?.message)
            })
            .catch((err)=>{
                console.log(err)
                setPageLoad(false)
            })


    }

    const deleteModalFunc = (id:string) => {
        setPageLoad(true)
        axios.delete(`${baseUrl}service/${id}`,
            {headers:{'Authorization':`Bearer ${ADMINTOKEN}`}})
            .then((res)=>{
                if (res.status===200){
                    getAllServices()
                    toast.success(res.data.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        onCloseModal()
    }
    return (
        <section className={'service_d p_relative h-100'}>
            <div className="table_div">
                <table>
                    <thead>
                        <tr>
                            <th>T/r</th>
                            <th>Full Name</th>
                            <th>Phone</th>
                            <th>Device</th>
                            <th>Desc</th>
                            <th>isCallClient</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.map((item,i)=>{
                        return(
                            <tr key={item._id}>
                                <td>{i+1}</td>
                                <td>{item.fullName}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.device}</td>
                                <td>{item.desc}</td>
                                <td><input className={'check'} onChange={(event)=>editShow(event,item._id)} type="checkbox" checked={item?.isChecked}/></td>
                                <td className={'buttons'}>
                                    <button onClick={()=> {
                                        setDeleteModal(true)
                                        setService(item)
                                    }}  className={"delete"}>
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
            <SectionLoad loading={pageLoad}/>
            <Modal
                isOpen={deleteModal}
                onRequestClose={onCloseModal}
                style={customStyles}
            >
                <div className="deleteModal">
                    <p>Haqiqatdan ham ushbu bennerni o'chirishni xoxlayszmi?</p>
                    <div className="buttons">
                        <button onClick={()=>deleteModalFunc(service?._id)} className={'yes'}>Ha</button>
                        <button onClick={()=>onCloseModal()} className={'no'}>Yo'q</button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default ServiceDashboard;
