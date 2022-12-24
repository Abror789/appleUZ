import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from "axios";
import {ADMINTOKEN, baseUrl} from "../../../Redux/variable";
import SectionLoad from "../../SectionLoad";
import Modal from 'react-modal';
import ReactModal from "react-modal";
import {toast} from "react-toastify";
type Category={
    _id:string,
    title:string,
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

Modal.setAppElement('#root');

const CategoryDashboard = () => {
    const [pageLoad,setPageLoad]=useState<boolean>(true)
    const [tableLoad,setTableLoad]=useState<boolean>(true)

    const [data,setData]=useState<Category>([])
    const [category,setCategory]=useState<any>({})

    const [deleteModal,setDeleteModal]=useState(false)
    const [addModal,setAddModal]=useState(false)
    const [editModal,setEditModal]=useState(false)
    const [title,setTitle]=useState('')
    const [editTitle,setEditTitle]=useState('')

    const getAllCategories = () => {
        axios.get(`${baseUrl}category`)
            .then((res)=>{
                setData(res?.data?.categories)
            })
            .catch((e)=>{
                console.log(e)
            })
            .finally(()=>{
                setPageLoad(false)
            })
    }

    useEffect(()=>{
       getAllCategories()
    },[])
    const onCloseModal = () => {
      setDeleteModal(false)
    }
    const onCloseModalAdd = () => {
        setAddModal(false)
    }
    const onCloseModalEdit = () => {
        setEditModal(false)
    }

    const addCategory = (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPageLoad(true)
        axios.post(`${baseUrl}category`,{
            title
        },
            {headers:{'Authorization':`Bearer ${ADMINTOKEN}`}}
        )
            .then((res)=>{
                if (res.status===201){
                    getAllCategories()
                    toast.success(res?.data?.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                setTitle('')
            })
        onCloseModalAdd()


    }
    const editCategory = (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPageLoad(true)
        axios.patch(`${baseUrl}category/${category?._id}`,{
                title:editTitle
        },
            {headers:{'Authorization':`Bearer ${ADMINTOKEN}`}}
        )
            .then((res)=>{
                if (res.status===201){
                    getAllCategories()
                    toast.success(res?.data?.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                setEditTitle('')
            })
        onCloseModalEdit()


    }
    const deleteModalFunc = (id:string) => {
        setPageLoad(true)
        axios.delete(`${baseUrl}category/${id}`,
            {headers:{'Authorization':`Bearer ${ADMINTOKEN}`}})
            .then((res)=>{
                console.log(res)
                if (res.status===200){
                    getAllCategories()
                    toast.success(res.data.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        onCloseModal()
    }

    return (
        <section className={"category_d p_relative h-100"}>
           <div className="table_div">
               <table>
                   <thead>
                   <tr>
                       <th>T/r</th>
                       <th>Category title</th>
                       <th>Created At</th>
                       <th></th>
                   </tr>
                   </thead>
                   <tbody>
                   {data?.map((item,index)=>{
                       return(
                           <tr key={item._id}>
                               <td>{index+1}</td>
                               <td>{item?.title}</td>
                               <td>{item.createdAt.slice(0,10)}</td>
                               <td className={"buttons"}>
                                   <button onClick={()=>{
                                       setEditModal(true)
                                       setCategory(item)
                                       setEditTitle(item?.title)
                                   }} className={"edit"}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                           <path
                                               d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                       </svg>
                                   </button>
                                   <button onClick={()=>{
                                       setDeleteModal(!deleteModal)
                                       setCategory(item)
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
                   {/*<TableLoad loading={loading}/>*/}
               </table>
               <button onClick={()=>setAddModal(true)} className={'add'}>Add Category</button>
           </div>
            <Modal
                isOpen={deleteModal}
                onRequestClose={onCloseModal}
                style={customStyles}
            >
                <div className="deleteModal">
                    <p>Haqiqatdan ham ushbu kategoriya({category?.title}) ni o'chirishni xoxlayszmi?</p>
                    <div className="buttons">
                        <button onClick={()=>deleteModalFunc(category?._id)} className={'yes'}>Ha</button>
                        <button onClick={()=>onCloseModal()} className={'no'}>Yo'q</button>
                    </div>
                </div>
            </Modal>
            <ReactModal onRequestClose={onCloseModalAdd} style={customStyles} isOpen={addModal}>
                <div className="add_category">
                    <p className={'add_title'}>Kategoriya qo'shish</p>
                    <form onSubmit={addCategory}>
                        <input minLength={2} maxLength={10} required className={'add_input'} value={title} onChange={event => setTitle(event.target.value)} type="text"/>
                        <button className={'add_modal_btn'}>Add</button>
                    </form>
                </div>
            </ReactModal>
            <ReactModal onRequestClose={onCloseModalEdit} style={customStyles} isOpen={editModal}>
                <div className="add_category">
                    <p className={'add_title'}>Kategoriyani tahrirlash</p>
                    <form onSubmit={editCategory}>
                        <input minLength={2} maxLength={10} required className={'add_input'} value={editTitle}  onChange={event => setEditTitle(event.target.value)} type="text"/>
                        <button className={'add_modal_btn'}>Edit</button>
                    </form>
                </div>
            </ReactModal>
            <SectionLoad loading={pageLoad}/>

        </section>
    );
};

export default CategoryDashboard;
