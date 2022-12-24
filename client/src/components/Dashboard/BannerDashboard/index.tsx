import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from "axios";
import {ADMINTOKEN, baseUrl} from "../../../Redux/variable";
import SectionLoad from "../../SectionLoad";
import {toast} from "react-toastify";
import ReactModal from "react-modal";
import Modal from "react-modal";

type Banner={
    _id:string,
    title:string,
    desc:string,
    source:string,
    isShow:boolean,
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

const BannerDashboard = () => {
    const [data,setData]=useState<Banner>([])
    const [pageLoad,setPageLoad]=useState<boolean>(true)
    const [addModal,setAddModal]=useState(false)
    const [deleteModal,setDeleteModal]=useState(false)
    const [editModal,setEditModal]=useState(false)
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [source,setSource]=useState<any>(null)
    const [banner,setBanner]=useState<any>({})

    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    const [isShow,setIsShow]=useState<any>(true)

    const getAllBanners = () => {
        axios.get(`${baseUrl}banners/all`,{headers:{'Authorization':`Bearer ${ADMINTOKEN}`}})
            .then((res)=>{
                setData(res?.data?.banners)
            })
            .catch((e)=>{
                console.log(e)
            })
            .finally(()=>{
                setPageLoad(false)
            })
    }
    useEffect(()=>{
        getAllBanners()
    },[])

    const onCloseModalAdd = () => {
        setAddModal(false)
    }
    const onCloseModalEdit = () => {
        setEditModal(false)
        setTitle('')
        setDesc('')
        setIsShow(true)
    }
    const onCloseModal = () => {
        setDeleteModal(false)
    }
    function previewFile(e:any) {
        setImagePreview(null)
        setVideoPreview(null)
        // Reading New File (open file Picker Box)
        const reader = new FileReader();
        // Gettting Selected File (user can select multiple 'but' we are choosing only one)
        const selectedFile = e.target.files[0];
        setSource(selectedFile)
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
        // As the File loaded then set the stage as per the file type
        reader.onload = (readerEvent:any) => {
            if (selectedFile.type.includes("image")) {
                setImagePreview(readerEvent.target.result);
            } else if (selectedFile.type.includes("video")) {
                setVideoPreview(readerEvent.target.result);
            }
        };
    }

    const editShow = (e:ChangeEvent<HTMLInputElement>,id:string) => {
        setPageLoad(true)
        const data=new FormData()
        data.append('isShow',e.target.checked.toString())

        axios.patch(`${baseUrl}banners/${id}`,
            data,
            {headers:{'Authorization':`Bearer ${ADMINTOKEN}`}})
            .then((res)=>{
                getAllBanners()
                toast.success(res?.data?.message)
            })
            .catch((err)=>{
                console.log(err)
                setPageLoad(false)
            })


    }
    const addBanner = (e:ChangeEvent<HTMLFormElement>) => {
      e.preventDefault()
        setPageLoad(true)
      const formData=new FormData()

      formData.append('title',title)
      if (desc.length>=1){
          formData.append('desc',desc)
      }
      formData.append('source',source)
      formData.append('isShow',isShow)

       axios.post(`${baseUrl}banners`,
           formData,
           {headers:{'Authorization':`Bearer ${ADMINTOKEN}`}})
           .then((res)=>{
               if (res.status===201){
                   getAllBanners()
                   toast.success(res?.data?.message)
               }
           })
           .catch((res)=>{
               console.log(res)
           })
        onCloseModalAdd()
    }
    const editBanner = (e:ChangeEvent<HTMLFormElement>) => {
      e.preventDefault()
        setPageLoad(true)
        const formData=new FormData()
        console.log(source)

        formData.append('title',title)
        if (desc.length>=1){
            formData.append('desc',desc)
        }
        if (source !==null){
            formData.append('source',source)
        }
        formData.append('isShow',isShow)

        axios.patch(`${baseUrl}banners/${banner?._id}`,
            formData,
            {headers:{'Authorization':`Bearer ${ADMINTOKEN}`}})
            .then((res)=>{
                if (res.status===201){
                    getAllBanners()
                    toast.success(res?.data?.message)
                }
            })
            .catch((res)=>{
                console.log(res)
            })
        onCloseModalEdit()
    }

    const deleteModalFunc = (id:string) => {
        setPageLoad(true)
        axios.delete(`${baseUrl}banners/${id}`,
            {headers:{'Authorization':`Bearer ${ADMINTOKEN}`}})
            .then((res)=>{
                if (res.status===200){
                    getAllBanners()
                    toast.success(res.data.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        onCloseModal()
    }



    return (
        <section className={"banner_d p_relative h-100"}>
            <div className="table_div">
                <table>
                    <thead>
                        <tr>
                            <th>T/r</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>isShow</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.map((item,i)=>{
                        return(
                            <tr key={item._id}>
                                <td>{i+1}</td>
                                <td>{item?.title}</td>
                                <td>{item?.desc?.length>=1?item.desc:'-'}</td>
                                <td><input className={"check"} onChange={(event)=>editShow(event,item._id)} checked={item?.isShow} type="checkbox"/></td>
                                <td className={"buttons"}>
                                    <button onClick={()=> {
                                        setEditModal(true)
                                        setBanner(item)
                                        setTitle(item.title)
                                        setDesc(item.desc)
                                        setIsShow(item.isShow)
                                    }} className={"edit"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                    </button>
                                    <button onClick={()=> {
                                        setDeleteModal(true)
                                        setBanner(item)
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
                <button onClick={()=>setAddModal(true)} className={"add"}>Add Banner</button>
            </div>
            <SectionLoad loading={pageLoad}/>
            <ReactModal onRequestClose={onCloseModalAdd} style={customStyles} isOpen={addModal}>
                <div className="add_banner">
                    <p className={'add_title'}>Banner qo'shish</p>
                    <form onSubmit={addBanner}>
                        <div className="input_img">
                            <input onChange={previewFile} required id={"source"} type="file"/>
                            <div className="img_div">
                                {(imagePreview ==null && videoPreview ==null)&&<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      className="bi bi-folder2-open" viewBox="0 0 16 16">
                                    <path
                                        d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"/>
                                </svg>}
                                {imagePreview != null && <img className={'banner_img'} src={imagePreview} alt="" />}
                                {videoPreview != null && <video height={200} className={'banner_img'} controls src={videoPreview}></video>}
                            </div>
                            <label htmlFor="source">
                                <div className={'center'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                    </svg>
                                    <h6>Yuklash</h6>
                                </div>
                            </label>
                        </div>
                        <div className="inputs">
                            <input value={title} onChange={event => setTitle(event.target.value)} className={'add_input'} required placeholder={"title"} type="text"/>
                            <input value={desc} onChange={event => setDesc(event.target.value)} className={'add_input'} placeholder={"description"} type="text"/>
                            <div className={"isShow"}>
                                <label>isShow</label>
                                <input checked={isShow} onChange={event => setIsShow(!isShow)} className={'check'} type="checkbox"/>
                            </div>
                            <button className={'add_modal_btn'}>Add</button>
                        </div>
                    </form>
                </div>
            </ReactModal>
            <ReactModal onRequestClose={onCloseModalEdit} style={customStyles} isOpen={editModal}>
                <div className="add_banner">
                    <p className={'add_title'}>Banner Tahrirlash</p>
                    <form onSubmit={editBanner}>
                        <div className="input_img">
                            <input onChange={previewFile}  id={"source"} type="file"/>
                            <div className="img_div">
                                {(imagePreview ==null && videoPreview ==null)&&<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      className="bi bi-folder2-open" viewBox="0 0 16 16">
                                    <path
                                        d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"/>
                                </svg>}
                                {imagePreview != null && <img className={'banner_img'} src={imagePreview} alt="" />}
                                {(imagePreview ==null && !(banner?.source?.includes('mp4'))) && <img className={'banner_img'} src={`http://localhost:5000/images/${banner.source}`} alt=""/>}
                                {videoPreview != null && <video height={200} className={'banner_img'} width="100%" loop autoPlay muted controls src={videoPreview}></video>}
                                {videoPreview == null && banner?.source?.includes('mp4') && <video height={200} className={'banner_img'} controls src={`http://localhost:5000/images/${banner.source}`}></video>}
                            </div>
                            <label htmlFor="source">
                                <div className={'center'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                    </svg>
                                    <h6>Yuklash</h6>
                                </div>
                            </label>
                        </div>
                        <div className="inputs">
                            <input value={title} onChange={event => setTitle(event.target.value)} className={'add_input'} required placeholder={"title"} type="text"/>
                            <input value={desc} onChange={event => setDesc(event.target.value)} className={'add_input'} placeholder={"description"} type="text"/>
                            <div className={"isShow"}>
                                <label>isShow</label>
                                <input checked={isShow} onChange={event => setIsShow(!isShow)} className={'check'} type="checkbox"/>
                            </div>
                            <button className={'add_modal_btn'}>Edit</button>
                        </div>
                    </form>
                </div>
            </ReactModal>
            <Modal
                isOpen={deleteModal}
                onRequestClose={onCloseModal}
                style={customStyles}
            >
                <div className="deleteModal">
                    <p>Haqiqatdan ham ushbu bennerni o'chirishni xoxlayszmi?</p>
                    <div className="buttons">
                        <button onClick={()=>deleteModalFunc(banner?._id)} className={'yes'}>Ha</button>
                        <button onClick={()=>onCloseModal()} className={'no'}>Yo'q</button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default BannerDashboard;
