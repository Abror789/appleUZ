import React, {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../Redux/variable";

const Add = () => {
    const [formValues, setFormValues] = useState<any>([{ name: "", char : ""}])
    const [title,setTitle]=useState('')
    const [category,setCategory]=useState('')
    const [price,setPrice]=useState('')
    const [images,setImages]=useState([])

    let handleChange = (i:number, e:ChangeEvent<HTMLInputElement>) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { name: "", char: "" }])
    }

    let removeFormFields = (i:number) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData=new FormData()
            for (const img of images){
                formData.append("images",img)
            }
            formData.append('title',title)
            formData.append('category',category)
            formData.append('price',price)
            formData.append('characters',JSON.stringify(formValues))

        axios.post(`${baseUrl}products`,formData)
                .then((res)=>{
                    console.log(res)
                })
                .catch((e)=>{
                    console.log(e)
                })

    }

    const hadnleChange = (files:any) => {
        const newArr:any=Array.from(files).map((i:any)=>i)
        setImages(newArr)
    }


    // const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    //     // console.log(images)
    //     // e.preventDefault()
    //     // const formData=new FormData()
    //     // for (const img of images){
    //     //     formData.append("images",img)
    //     // }
    //     // const data=new FormData()
    //     //
    //     // data.append('title',title)
    //     // data.append('original',original!)
    //     // data.append('thumbnail',thumbnail!)
    //     // axios.post('http://localhost:5000/api/products',data)
    //     //     .then((res)=>{
    //     //         console.log(res)
    //     //     })
    //     //     .catch((e)=>{
    //     //         console.log(e)
    //     //     })
    // }


    return (
        <div className={"add_product"}>
            <form  onSubmit={handleSubmit}>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder={"title"} type="text"/>
                    <input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder={"category"} type="text"/>
                    <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" placeholder={"price"}/>
                    <input multiple={true} onChange={(e)=>hadnleChange(e.target.files)} required type="file"/>
                {formValues.map((element:any, index:any) => (
                    <div className="form-inline" key={index}>
                        <label>Name</label>
                        <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                        <label>Value</label>
                        <input type="text" name="char" value={element.char || ""} onChange={e => handleChange(index, e)} />
                        {
                            index ?
                                <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                                : null
                        }
                    </div>
                ))}
                <div className="button-section">
                    <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                    <button className="button submit" type="submit">Submit</button>
                </div>
            </form>
            {/*<form onSubmit={(e)=>handleSubmit(e)}>*/}
            {/*
            {/*    <button type={"submit"}>add</button>*/}
            {/*</form>*/}
        </div>
    );
};

export default Add;
