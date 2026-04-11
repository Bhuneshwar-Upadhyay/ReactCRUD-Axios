import React, { useState } from 'react'
import { postData } from '../api/PostApi';

const Form = ({ data, setData }) => {
    const [addData, setAddData] = useState({
        title: "",
        body: ""
    });

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const addPostData = async () => {
        const res = await postData(addData);
        console.log(res);

        if (res.status === 201) {
            setData([...data, res.data]);
            setAddData({ title: "", body: "" });
        }
    }

    //form submission 
    const handleFormSubmit = (e) => {
        e.preventDefault();
        addPostData();
    }


    return (
        <div className='mb-5'>
            <form onSubmit={handleFormSubmit}>
                <input type='text' name="title" onChange={handleInputChange} value={addData.title} placeholder='Title' className='w-full border border-gray-500 mb-3 py-2 px-4 text-gray-500' />
                <textarea placeholder='Body' name="body" onChange={handleInputChange} value={addData.body} className='w-full border border-gray-500 mb-3 py-2 px-4 text-gray-500'></textarea>
                <button type='submit' className='text-white py-2 px-5 bg-green-600 hover:bg-green-700 cursor-pointer rounded-xl'>ADD</button>
            </form>
        </div>
    )
}

export default Form